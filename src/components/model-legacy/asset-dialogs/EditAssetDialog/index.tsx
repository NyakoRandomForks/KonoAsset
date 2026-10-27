import { TabsContent } from '@/components/ui/tabs'
import { useEditAssetDialog } from './hook'
import { DialogWrapper } from '../components/DialogWrapper'
import { Skeleton } from '@/components/ui/skeleton'
import { DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { EditAssetForm } from './components/EditAssetForm'

type Props = {
  id: string | null
  dialogOpen: boolean
  setDialogOpen: (open: boolean) => void
}

export const EditAssetDialog = ({ id, dialogOpen, setDialogOpen }: Props) => {
  const {
    loadingAssetData,
    form,
    tab,
    setTab,
    imageUrls,
    setImageUrls,
    onSubmit,
    submitting,
  } = useEditAssetDialog({
    id,
    dialogOpen,
    setDialogOpen,
  })

  return (
    <DialogWrapper
      dialogOpen={dialogOpen}
      setDialogOpen={setDialogOpen}
      tab={loadingAssetData ? 'loading' : tab}
      setTab={setTab}
      hideTrigger
      contentClassName="max-h-[85vh] max-w-[75vw]"
    >
      <TabsContent value="loading">
        <DialogTitle className="hidden" />
        <DialogDescription className="hidden" />
        <Skeleton className="w-72 h-4 rounded-sm" />
        <Skeleton className="mt-2 w-52 h-4 rounded-sm" />
        <Skeleton className="mt-8 w-32 h-4 rounded-sm" />
        <Skeleton className="mt-2 w-full h-8 rounded-sm" />
        <Skeleton className="mt-6 mx-auto w-24 h-10 rounded-sm" />
        <Skeleton className="mt-4 w-20 h-8 rounded-sm" />
      </TabsContent>
      <TabsContent value="form">
        <EditAssetForm
          form={form}
          imageUrls={imageUrls}
          setImageUrls={setImageUrls}
          closeDialog={() => setDialogOpen(false)}
          onSubmit={onSubmit}
          submitting={submitting}
        />
      </TabsContent>
    </DialogWrapper>
  )
}
