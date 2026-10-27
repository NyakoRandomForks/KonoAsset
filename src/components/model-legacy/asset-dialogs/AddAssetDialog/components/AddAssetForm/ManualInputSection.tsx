import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import TextInputSelect from '@/components/ui/text-input-select'
import { SquareImage } from '@/components/models/square-image/SquareImage'
import { useLocalization } from '@/hooks/use-localization'
import { AssetFormType } from '@/lib/form'
import { useManualInputTabHooks } from '@/components/model-legacy/asset-dialogs/components/tabs/ManualInputTab/hook'
import { AvatarLayout } from '@/components/model-legacy/asset-dialogs/components/tabs/ManualInputTab/layout/AvatarLayout'
import { AvatarWearableLayout } from '@/components/model-legacy/asset-dialogs/components/tabs/ManualInputTab/layout/AvatarWearableLayout'
import { WorldObjectLayout } from '@/components/model-legacy/asset-dialogs/components/tabs/ManualInputTab/layout/WorldObjectLayout'
import { OtherAssetLayout } from '@/components/model-legacy/asset-dialogs/components/tabs/ManualInputTab/layout/OtherAssetLayout'
import { CompactAssetTypeSelector } from './CompactAssetTypeSelector'

type Props = {
  form: AssetFormType
  imageUrls: string[]
}

export const ManualInputSection = ({ form, imageUrls }: Props) => {
  const { t } = useLocalization()
  const { assetType, imageFilename, creatorCandidates } =
    useManualInputTabHooks({ form })

  return (
    <div className="space-y-4">
      <div className="flex flex-row space-x-6">
        <div className="w-1/3">
          <SquareImage
            assetType={assetType}
            filename={imageFilename ?? undefined}
            imageUrls={imageUrls}
            userImageSelectable
            onUserImageSelect={(filename) => {
              form.setValue('imageFilename', filename)
            }}
          />
        </div>
        <div className="w-2/3 space-y-6">
          <div className="space-y-2">
            <Label>{t('addasset:manual-input:asset-name')}</Label>
            <Input
              placeholder={t('addasset:manual-input:asset-name:placeholder')}
              autoComplete="off"
              value={form.watch('name')}
              onChange={(e) => form.setValue('name', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>{t('addasset:manual-input:shop-name')}</Label>
            <TextInputSelect
              options={creatorCandidates}
              placeholder={t('addasset:manual-input:shop-name:placeholder')}
              emptyIndicator={
                <p className="text-center text-lg text-muted-foreground">
                  {t('addasset:empty-indicator')}
                </p>
              }
              value={form.watch('creator')}
              onChange={(value) => {
                form.setValue('creator', value)
              }}
            />
          </div>
          <div className="space-y-2">
            <Label>{t('addasset:select-type')}</Label>
            <CompactAssetTypeSelector form={form} />
          </div>
        </div>
      </div>

      {assetType === 'Avatar' && <AvatarLayout form={form} />}
      {assetType === 'AvatarWearable' && <AvatarWearableLayout form={form} />}
      {assetType === 'WorldObject' && <WorldObjectLayout form={form} />}
      {assetType === 'OtherAsset' && <OtherAssetLayout form={form} />}
    </div>
  )
}
