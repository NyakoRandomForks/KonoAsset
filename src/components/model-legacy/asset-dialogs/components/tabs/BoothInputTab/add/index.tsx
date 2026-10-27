import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ChevronRight, Loader2 } from 'lucide-react'
import { AssetFormType } from '@/lib/form'
import { useBoothInputTabForAddDialog } from './hook'
import { isBoothURL } from '@/lib/utils'
import { useLocalization } from '@/hooks/use-localization'

type Props = {
  form: AssetFormType
  setTab: (tab: string) => void
  setImageUrls: (imageUrls: string[]) => void
}

export const BoothInputTabForAddDialog = ({
  form,
  setTab,
  setImageUrls,
}: Props) => {
  const { t } = useLocalization()
  const {
    representativeImportFilename,
    importFileCount,
    getAssetDescriptionFromBooth,
    onUrlInputChange,
    fetching,
    boothUrlInput,
  } = useBoothInputTabForAddDialog({
    form,
    setTab,
    setImageUrls,
  })

  return (
    <div className="space-y-4">
      <p className="space-x-2 text-left">
        <span className="text-muted-foreground">
          {t('addasset:booth-input:representative-file')}
        </span>
        <span>{representativeImportFilename}</span>
        {importFileCount > 1 && (
          <span className="text-muted-foreground">
            {t('addasset:booth-input:multi-import:foretext')}
            {importFileCount - 1}
            {t('addasset:booth-input:multi-import:posttext')}
          </span>
        )}
      </p>
      <div className="space-y-2">
        <div className="flex flex-row items-center gap-2">
		  <Label className="text-base">
		    {t('addasset:booth-input:get-info')}
		  </Label>
          <Input
            className="max-w-xs"
            placeholder="<id> / https://booth.pm/ja/items/<id>"
            value={boothUrlInput}
            onChange={onUrlInputChange}
            disabled={fetching}
          />
          <Button
            disabled={fetching || !isBoothURL(boothUrlInput)}
            onClick={() => getAssetDescriptionFromBooth()}
            className="h-10 shrink-0 gap-1"
          >
            {!fetching && <ChevronRight size={16} />}
            {fetching && <Loader2 size={16} className="animate-spin" />}
            {t('addasset:booth-input:button-text')}
          </Button>
        </div>
      </div>
    </div>
  )
}
