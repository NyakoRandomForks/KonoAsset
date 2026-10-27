import { Button } from '@/components/ui/button'
import { useLocalization } from '@/hooks/use-localization'
import { AssetFormType } from '@/lib/form'
import { cn } from '@/lib/utils'

const assetTypes = [
  { type: 'Avatar', labelKey: 'general:typeavatar' },
  { type: 'AvatarWearable', labelKey: 'general:typeavatarwearable' },
  { type: 'WorldObject', labelKey: 'general:typeworldobject' },
  { type: 'OtherAsset', labelKey: 'general:typeotherasset' },
] as const

type Props = {
  form: AssetFormType
}

export const CompactAssetTypeSelector = ({ form }: Props) => {
  const { t } = useLocalization()
  const selectedType = form.watch('assetType')

  return (
    <div
      className="grid grid-cols-4 gap-2"
      role="group"
      aria-label={t('addasset:select-type')}
    >
      {assetTypes.map(({ type, labelKey }) => (
        <Button
          key={type}
          type="button"
          variant="outline"
          onClick={() => form.setValue('assetType', type)}
          aria-pressed={selectedType === type}
          className={cn(
            'h-auto min-h-8 whitespace-normal px-1 py-1 text-xs leading-tight',
            selectedType === type &&
              'border-2 border-ring ring-ring/50 ring-[3px]',
          )}
        >
          {t(labelKey)}
        </Button>
      ))}
    </div>
  )
}
