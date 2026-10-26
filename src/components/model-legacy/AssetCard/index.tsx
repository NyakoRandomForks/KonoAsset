import { useLocalization } from '@/hooks/use-localization'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { RefObject } from 'react'
import { AssetSummary } from '@/lib/bindings'
import { AssetCardOpenButton } from '@/components/model-legacy/action-buttons/AssetCardOpenButton'
import { Button } from '@/components/ui/button'
import { NotebookText } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAssetSummaryViewStore } from '@/stores/AssetSummaryViewStore'
import { useAssetFilterStore } from '@/stores/AssetFilterStore'
import { AssetCardCategoryBadge } from '@/components/models/asset-card/AssetCardCategoryBadge'
import { assetTypeBorderClassName } from '@/components/models/asset-card/assetTypeBorder'
import { useMemoDialogStore } from '@/stores/dialogs/MemoDialogStore'
import { AssetCardMeatballMenu } from '@/components/models/asset-card/AssetCardMeatballMenu'
import { SquareImage } from '@/components/models/square-image/SquareImage'

type Props = {
  asset: AssetSummary
  ref?: RefObject<HTMLDivElement | null>
  openEditAssetDialog: (assetId: string) => void
}

export const AssetCard = ({ asset, ref, openEditAssetDialog }: Props) => {
  const { t } = useLocalization()
  const updateFilter = useAssetFilterStore((state) => state.updateFilter)
  const displayStyle = useAssetSummaryViewStore((state) => state.displayStyle)
  const category = asset.category

  const openMemoDialog = useMemoDialogStore((state) => state.open)

  return (
    <Card
      className={cn(
        'w-full bg-card m-1 py-0',
        assetTypeBorderClassName[asset.assetType],
      )}
      ref={ref}
      data-asset-id={asset.id}
    >
      <CardContent className="size-full p-4 flex flex-col">
        <div className="size-full shrink mb-2">
          <SquareImage
            assetType={asset.assetType}
            filename={asset.imageFilename ?? undefined}
          />
          {asset.hasMemo && (
            <div className="mt-2 flex w-full flex-row justify-end">
              <Button
                aria-label={t('general:memo')}
                variant="outline"
                className="size-8"
                onClick={() => openMemoDialog(asset.id)}
              >
                <NotebookText />
              </Button>
            </div>
          )}
          <CardTitle
            className={cn(
              'text-lg mt-2 wrap-break-word whitespace-pre-wrap line-clamp-2',
              displayStyle === 'GridSmall' && 'text-base',
            )}
          >
            {asset.name}
          </CardTitle>
          {category !== null && (
            <AssetCardCategoryBadge
              className="mt-1"
              category={category}
              onClick={() =>
                updateFilter({
                  category: {
                    type: 'OR',
                    filters: [category],
                  },
                })
              }
            />
          )}
        </div>
        <div className="flex flex-row w-full mt-2 space-x-2 shrink-0">
          <AssetCardOpenButton
            id={asset.id}
            hasDependencies={asset.dependencies.length > 0}
            displayOpenButtonText={displayStyle !== 'GridSmall'}
          />
          <AssetCardMeatballMenu
            id={asset.id}
            boothItemID={asset.boothItemId ?? undefined}
            openEditAssetDialog={() => {
              openEditAssetDialog(asset.id)
            }}
          />
        </div>
      </CardContent>
    </Card>
  )
}
