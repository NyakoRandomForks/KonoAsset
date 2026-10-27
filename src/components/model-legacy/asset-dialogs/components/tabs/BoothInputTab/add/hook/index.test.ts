import { describe, expect, it, Mock, vi } from 'vitest'
import { useBoothInputTabForAddDialog } from '.'
import { act, renderHook } from '@testing-library/react'
import { useToast } from '@/hooks/use-toast'
import { getAndSetAssetInfoFromBoothToForm } from '../../logic'
import { AddAssetDialogContext } from '../../../../../AddAssetDialog'
import { createElement, type ReactNode } from 'react'

const createWrapper = (assetPaths?: string[]) => {
  return ({ children }: { children: ReactNode }) =>
    createElement(
      AddAssetDialogContext.Provider,
      {
        value: {
          assetPaths,
          setAssetPaths: vi.fn(),
          duplicateWarningItems: [],
          setDuplicateWarningItems: vi.fn(),
        },
      },
      children,
    )
}

vi.mock('@tauri-apps/api/path', () => ({
  sep: () => '/',
}))

vi.mock('../../logic', () => {
  return {
    getAndSetAssetInfoFromBoothToForm: vi
      .fn()
      .mockResolvedValueOnce({
        status: 'ok',
        data: {
          goNext: true,
          duplicated: false,
        },
      })
      .mockResolvedValueOnce({
        status: 'ok',
        data: {
          goNext: false,
          duplicated: true,
          duplicatedItems: [],
        },
      })
      .mockResolvedValueOnce({
        status: 'error',
        error: 'error message',
      }),
  }
})

vi.mock('@/hooks/use-toast', () => {
  const toast = vi.fn()

  return {
    useToast: () => ({
      toast,
    }),
  }
})

vi.mock('@/lib/bindings', () => {
  return {
    commands: {
      getAppState: vi.fn().mockResolvedValue({
        status: 'ok',
        data: {
          displayStyle: 'GridMedium',
          sort: {
            sortBy: 'CreatedAt',
            reversed: true,
          },
        },
      }),
    },
  }
})

describe('BoothInputTab Hook', () => {
  it('correctly maintains the URL input value', () => {
    const mockForm = {
      getValues: vi.fn().mockReturnValue(null),
    }
    const mockSetTab = vi.fn()

    const { result } = renderHook(() =>
      useBoothInputTabForAddDialog({
        // @ts-expect-error mockForm is not a valid AssetFormType but satisfies the required fields
        form: mockForm,
        setTab: mockSetTab,
      }),
    )

    // Initial state should be empty
    expect(result.current.boothUrlInput).toBe('')

    // Update URL value
    const url = 'https://booth.pm/ja/items/12345'

    act(() => {
      result.current.onUrlInputChange({
        target: { value: url },
      } as React.ChangeEvent<HTMLInputElement>)
    })
    expect(result.current.boothUrlInput).toBe(url)
  })

  it('executes getAssetDescriptionFromBooth function correctly', async () => {
    const mockForm = {
      getValues: vi.fn().mockReturnValue(null),
    }
    const mockSetTab = vi.fn()
    const mockToast = useToast().toast as Mock

    const { result } = renderHook(() =>
      useBoothInputTabForAddDialog({
        // @ts-expect-error mockForm is not a valid AssetFormType but satisfies the required fields
        form: mockForm,
        setTab: mockSetTab,
      }),
    )

    // Nothing happens before the input
    await result.current.getAssetDescriptionFromBooth()
    expect(getAndSetAssetInfoFromBoothToForm).not.toHaveBeenCalled()

    // Success Case
    act(() => {
      result.current.onUrlInputChange({
        // @ts-expect-error type check fails but it satisfies the required fields
        target: { value: 'https://booth.pm/ja/items/12345' },
      })
    })

    await result.current.getAssetDescriptionFromBooth()

    expect(mockSetTab).toHaveBeenCalledTimes(1)
    expect(mockSetTab.mock.calls[0][0]).toEqual('asset-type-selector')

    // Duplication Case
    act(() => {
      result.current.onUrlInputChange({
        // @ts-expect-error type check fails but it satisfies the required fields
        target: { value: 'https://booth.pm/ja/items/12345' },
      })
    })

    await result.current.getAssetDescriptionFromBooth()

    expect(mockSetTab).toHaveBeenCalledTimes(2)
    expect(mockSetTab.mock.calls[1][0]).toEqual('duplicate-warning')

    // Error Case
    act(() => {
      result.current.onUrlInputChange({
        // @ts-expect-error type check fails but it satisfies the required fields
        target: { value: 'https://booth.pm/ja/items/12345' },
      })
    })

    await result.current.getAssetDescriptionFromBooth()

    expect(mockToast).toHaveBeenCalledOnce()
  })

  it('executes backToPreviousTab function correctly', async () => {
    const mockForm = {
      getValues: vi.fn().mockReturnValue(null),
    }
    const mockSetTab = vi.fn()

    const { result } = renderHook(() =>
      useBoothInputTabForAddDialog({
        // @ts-expect-error mockForm is not a valid AssetFormType but satisfies the required fields
        form: mockForm,
        setTab: mockSetTab,
      }),
    )

    result.current.backToPreviousTab()

    expect(mockSetTab).toHaveBeenCalledTimes(1)
    expect(mockSetTab.mock.calls[0][0]).toEqual('selector')
  })
})

describe('BoothInputTab Hook auto fill', () => {
  it('auto fills the booth item ID from the representative filename', async () => {
    const mockForm = {
      getValues: vi.fn().mockReturnValue(null),
    }
    const mockedGetAssetInfo = vi.mocked(getAndSetAssetInfoFromBoothToForm)
    mockedGetAssetInfo.mockClear()
    mockedGetAssetInfo.mockResolvedValueOnce({
      status: 'ok',
      data: {
        goNext: true,
        duplicated: false,
      },
    })

    const { result } = renderHook(
      () =>
        useBoothInputTabForAddDialog({
          // @ts-expect-error mockForm is not a valid AssetFormType but satisfies the required fields
          form: mockForm,
          setTab: vi.fn(),
        }),
      { wrapper: createWrapper(['12345_sample']) },
    )

    expect(result.current.boothUrlInput).toBe('12345')

    await act(async () => {
      await result.current.getAssetDescriptionFromBooth()
    })

    expect(mockedGetAssetInfo).toHaveBeenCalledWith(
      expect.objectContaining({ boothItemId: 12345 }),
    )
  })

  it('does not auto fill when the filename has no ID separator', () => {
    const mockForm = {
      getValues: vi.fn().mockReturnValue(null),
    }

    const { result } = renderHook(
      () =>
        useBoothInputTabForAddDialog({
          // @ts-expect-error mockForm is not a valid AssetFormType but satisfies the required fields
          form: mockForm,
          setTab: vi.fn(),
        }),
      { wrapper: createWrapper(['12345sample']) },
    )

    expect(result.current.boothUrlInput).toBe('')
  })

  it('does not overwrite an already set booth item ID', () => {
    const mockForm = {
      getValues: vi.fn().mockReturnValue(999),
    }

    const { result } = renderHook(
      () =>
        useBoothInputTabForAddDialog({
          // @ts-expect-error mockForm is not a valid AssetFormType but satisfies the required fields
          form: mockForm,
          setTab: vi.fn(),
        }),
      { wrapper: createWrapper(['12345_sample']) },
    )

    expect(result.current.boothUrlInput).toBe('https://booth.pm/ja/items/999')
  })
})
