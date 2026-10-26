import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { FC } from 'react'

type Props = {
  className?: string
  category: string
  onClick?: () => void
}

export const AssetCardCategoryBadge: FC<Props> = ({
  className,
  category,
  onClick,
}) => {
  return (
    <Badge
      variant="secondary"
      className={cn(
        'block truncate select-none shrink bg-[#2196f3] text-white',
        onClick && 'cursor-pointer',
        className,
      )}
      onClick={onClick}
      title={category}
    >
      {category}
    </Badge>
  )
}
