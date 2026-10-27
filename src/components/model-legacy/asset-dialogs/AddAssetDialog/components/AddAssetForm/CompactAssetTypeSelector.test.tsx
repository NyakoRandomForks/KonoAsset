import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { CompactAssetTypeSelector } from './CompactAssetTypeSelector'

vi.mock('@/hooks/use-localization', () => {
  return {
    useLocalization: () => ({
      t: (key: string) => key,
    }),
  }
})

describe('CompactAssetTypeSelector', () => {
  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  it('sets the asset type when a button is clicked', () => {
    const setValue = vi.fn()
    const mockForm = {
      watch: vi.fn().mockReturnValue('Avatar'),
      setValue,
    }

    render(
      // @ts-expect-error mockForm is not a valid AssetFormType but satisfies the required fields
      <CompactAssetTypeSelector form={mockForm} />,
    )

    expect(
      screen
        .getByText('general:typeavatar')
        .closest('button')
        ?.getAttribute('aria-pressed'),
    ).toBe('true')

    fireEvent.click(screen.getByText('general:typeavatarwearable'))

    expect(setValue).toHaveBeenCalledWith('assetType', 'AvatarWearable')
  })
})
