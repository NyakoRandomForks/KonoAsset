import { Label } from '@/components/ui/label'
import { useLocalization } from '@/hooks/use-localization'
import { Textarea } from '@/components/ui/textarea'
import { FC } from 'react'

type Props = {
  memo: string
  setMemo: (memo: string) => void
  textareaClassName?: string
}

export const MemoInput: FC<Props> = ({
  memo,
  setMemo,
  textareaClassName = 'h-28',
}) => {
  const { t } = useLocalization()
  return (
    <div className="w-full flex flex-row mb-4">
      <div className="w-full space-y-2">
        <Label>{t('general:memo')}</Label>
        <Textarea
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          autoComplete="off"
          className={`resize-none ${textareaClassName}`}
          placeholder={t('addasset:memo:placeholder')}
        />
      </div>
    </div>
  )
}
