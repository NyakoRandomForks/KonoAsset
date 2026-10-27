import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useLocalization } from '@/hooks/use-localization'
import { AssetFormType } from '@/lib/form'
import { Loader2 } from 'lucide-react'
import { BoothInputTabForAddDialog } from '@/components/model-legacy/asset-dialogs/components/tabs/BoothInputTab/add'
import { useAdditionalInputTab } from '@/components/model-legacy/asset-dialogs/components/tabs/AdditionalInputTab/hook'
import { ManualInputSection } from './ManualInputSection'
import { AdditionalInputSection } from './AdditionalInputSection'

type Props = {
  form: AssetFormType
  imageUrls: string[]
  setImageUrls: (imageUrls: string[]) => void
  setTab: (tab: string) => void
  closeDialog: () => void
  validatePaths: () => Promise<boolean>
  submit: (ignoreNonExistingPaths: boolean) => Promise<void>
  submitting: boolean
}

export const AddAssetForm = ({
  form,
  imageUrls,
  setImageUrls,
  setTab,
  closeDialog,
  validatePaths,
  submit,
  submitting,
}: Props) => {
  const { t } = useLocalization()
  const {
    memo,
    setMemo,
    dependencies,
    setDependencies,
    deleteSourceChecked,
    setDeleteSourceChecked,
  } = useAdditionalInputTab({ form })

  const onAddAsset = async () => {
    const isAbleToSubmit = await validatePaths()
    if (isAbleToSubmit) {
      await submit(false)
    }
  }

  return (
    <div className="flex max-h-[85vh] flex-col">
      <DialogHeader className="mb-4">
        <DialogTitle>{t('addasset:add-asset')}</DialogTitle>
        <DialogDescription className="sr-only">
          {t('addasset:add-asset')}
        </DialogDescription>
      </DialogHeader>
      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto pr-1">
        <section className="space-y-2">
          <BoothInputTabForAddDialog
            form={form}
            setTab={setTab}
            setImageUrls={setImageUrls}
          />
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
        <div className="flex items-center mr-auto">
          <Checkbox
            className="cursor-pointer disabled:cursor-not-allowed"
            checked={deleteSourceChecked}
            onCheckedChange={setDeleteSourceChecked}
            disabled={submitting}
          />
          <Label
            className="ml-2 cursor-pointer"
            onClick={() => setDeleteSourceChecked(!deleteSourceChecked)}
          >
            {t('addasset:additional-input:delete-source')}
          </Label>
        </div>
        <Button
          variant="outline"
          onClick={closeDialog}
          disabled={submitting}
          className="sm:ml-auto"
        >
          {t('general:button:cancel')}
        </Button>
        <Button disabled={submitting} onClick={onAddAsset}>
          {submitting && <Loader2 className="animate-spin" />}
          {t('addasset:add-asset')}
        </Button>
      </DialogFooter>
    </div>
  )
}
