import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { FC } from 'react'

type Props = {
  className?: string
  tags: string[]
}

export const AssetTagBadges: FC<Props> = ({ className, tags }) => {
  if (tags.length === 0) {
    return null
  }

  return (
    <div
      className={cn(
        'flex min-w-0 flex-row flex-nowrap items-center gap-1 overflow-hidden',
        className,
      )}
    >
      {tags.map((tag, index) => (
        <Badge
          key={`${tag}-${index}`}
          variant="outline"
          className="max-w-40 shrink-0 truncate"
          title={tag}
        >
          {tag}
        </Badge>
      ))}
    </div>
  )
}
