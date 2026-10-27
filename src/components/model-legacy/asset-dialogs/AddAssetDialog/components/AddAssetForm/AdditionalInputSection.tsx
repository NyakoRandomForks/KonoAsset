import { MemoInput } from '@/components/model-legacy/asset-dialogs/components/tabs/AdditionalInputTab/components/MemoInput'
import { DependencyInput } from '@/components/model-legacy/asset-dialogs/components/tabs/AdditionalInputTab/components/DependencyInput'

type Props = {
  memo: string | null
  setMemo: (memo: string | null) => void
  dependencies: string[]
  setDependencies: (dependencies: string[]) => void
}

export const AdditionalInputSection = ({
  memo,
  setMemo,
  dependencies,
  setDependencies,
}: Props) => {
  return (
    <div>
      <DependencyInput
        dependencies={dependencies}
        setDependencies={setDependencies}
      />
      <MemoInput memo={memo ?? ''} setMemo={setMemo} textareaClassName="h-20" />
    </div>
  )
}
