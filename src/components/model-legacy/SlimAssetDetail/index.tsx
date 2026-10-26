import { SquareImage } from '@/components/models/square-image/SquareImage'
import { Card } from '@/components/ui/card'
import { AssetSummary } from '@/lib/bindings'
import { cn } from '@/lib/utils'
import { FC, ReactNode } from 'react'
import { AssetCardCategoryBadge } from '@/components/models/asset-card/AssetCardCategoryBadge'
import { assetTypeBorderClassName } from '@/components/models/asset-card/assetTypeBorder'
import { AssetTagBadges } from '@/components/models/asset-card/AssetTagBadges'

type Props = {
  children?: ReactNode
  className?: string
  asset: AssetSummary
  showTags?: boolean
  onCategoryClick?: (category: string) => void
}

export const SlimAssetDetail: FC<Props> = ({
  children,
  className,
  asset,
  showTags = false,
  onCategoryClick,
}) => {
  const category = asset.category

  return (
    <Card
      data-asset-id={asset.id}
      className={cn(
        'w-full flex flex-row p-2 space-x-4 gap-0',
        assetTypeBorderClassName[asset.assetType],
        className,
      )}
    >
      <div className="w-12 h-12">
        <SquareImage
          assetType={asset.assetType}
          filename={asset.imageFilename ?? undefined}
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="w-full truncate">{asset.name}</p>
        {(category !== null || (showTags && asset.tags.length > 0)) && (
          <div className="mt-1 flex min-w-0 flex-row flex-nowrap items-center gap-1 overflow-hidden">
            {category !== null && (
              <AssetCardCategoryBadge
                className="max-w-48 shrink-0"
                category={category}
                onClick={
                  onCategoryClick ? () => onCategoryClick(category) : undefined
                }
              />
            )}
            {showTags && (
              <AssetTagBadges tags={asset.tags} className="min-w-0" />
            )}
          </div>
        )}
      </div>
      <div className="space-x-2 flex flex-row items-center">{children}</div>
    </Card>
  )
}
