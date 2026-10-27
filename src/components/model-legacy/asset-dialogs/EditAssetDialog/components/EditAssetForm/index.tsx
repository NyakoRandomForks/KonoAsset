import { Button } from '@/components/ui/button'
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { useLocalization } from '@/hooks/use-localization'
import { AssetFormType } from '@/lib/form'
import { Loader2 } from 'lucide-react'
import { BoothInputTabForEditDialog } from '@/components/model-legacy/asset-dialogs/components/tabs/BoothInputTab/edit'
import { useAdditionalInputTab } from '@/components/model-legacy/asset-dialogs/components/tabs/AdditionalInputTab/hook'
import { ManualInputSection } from '@/components/model-legacy/asset-dialogs/AddAssetDialog/components/AddAssetForm/ManualInputSection'
import { AdditionalInputSection } from '@/components/model-legacy/asset-dialogs/AddAssetDialog/components/AddAssetForm/AdditionalInputSection'

type Props = {
  form: AssetFormType
  imageUrls: string[]
  setImageUrls: (imageUrls: string[]) => void
  closeDialog: () => void
  onSubmit: () => Promise<void>
  submitting: boolean
}

export const EditAssetForm = ({
  form,
  imageUrls,
  setImageUrls,
  closeDialog,
  onSubmit,
  submitting,
}: Props) => {
  const { t } = useLocalization()
  const { memo, setMemo, dependencies, setDependencies } =
    useAdditionalInputTab({
      form,
    })

  return (
    <div className="flex max-h-[calc(85vh-3rem)] flex-col">
      <DialogHeader className="mb-4">
        <DialogTitle>{t('addasset:update-asset')}</DialogTitle>
        <DialogDescription className="sr-only">
          {t('addasset:update-asset')}
        </DialogDescription>
      </DialogHeader>
      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto pr-1">
        <section className="space-y-2">
          <BoothInputTabForEditDialog form={form} setImageUrls={setImageUrls} />
        </section>
        <Separator />
        <section className="space-y-2 pe-5">
          <ManualInputSection form={form} imageUrls={imageUrls} />
        </section>
        <section className="space-y-2">
          <AdditionalInputSection
            memo={memo}
            setMemo={setMemo}
            dependencies={dependencies}
            setDependencies={setDependencies}
          />
        </section>
      </div>
      <DialogFooter className="mt-4 border-t pt-4 sm:items-center">
        <Button
          variant="outline"
          onClick={closeDialog}
          disabled={submitting}
          className="sm:ml-auto"
        >
          {t('general:button:cancel')}
        </Button>
        <Button disabled={submitting} onClick={onSubmit}>
          {submitting && <Loader2 className="animate-spin" />}
          {t('addasset:update-asset')}
        </Button>
      </DialogFooter>
    </div>
  )
}
