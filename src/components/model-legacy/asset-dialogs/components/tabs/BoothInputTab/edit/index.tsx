import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ChevronRight, Loader2 } from 'lucide-react'
import { AssetFormType } from '@/lib/form'
import { useBoothInputTabForEditDialog } from './hook'
import { isBoothURL } from '@/lib/utils'
import { useLocalization } from '@/hooks/use-localization'

type Props = {
  form: AssetFormType
  setImageUrls: (imageUrls: string[]) => void
}

export const BoothInputTabForEditDialog = ({ form, setImageUrls }: Props) => {
  const { t } = useLocalization()
  const {
    getAssetDescriptionFromBooth,
    onUrlInputChange,
    fetching,
    boothUrlInput,
  } = useBoothInputTabForEditDialog({
    form,
    setImageUrls,
  })

  return (
    <div className="space-y-2">
      <Label className="text-base">{t('addasset:booth-edit:overwrite')}</Label>
      <div className="flex flex-row items-center gap-2">
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
  )
}
