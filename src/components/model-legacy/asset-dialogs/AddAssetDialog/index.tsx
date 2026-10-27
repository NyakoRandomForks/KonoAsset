import { TabsContent } from '@/components/ui/tabs'
import { createContext } from 'react'
import { AssetPathSelectorTab } from '../components/tabs/AssetPathSelectorTab'
import { DuplicateWarningTab } from '../components/tabs/DuplicateWarningTab'
import { AssetSummary } from '@/lib/bindings'
import { ProgressTab } from '../components/tabs/ProgressTab'
import { useAddAssetDialog } from './hook'
import { DialogWrapper } from '../components/DialogWrapper'
import { AddAssetForm } from './components/AddAssetForm'
import { PathConfirmationTab } from '../components/tabs/PathConfirmationTab'

export type AddAssetDialogContextType = {
  assetPaths?: string[]
  setAssetPaths: (paths: string[]) => void

  duplicateWarningItems: AssetSummary[]
  setDuplicateWarningItems: (items: AssetSummary[]) => void
}

export const AddAssetDialogContext = createContext<AddAssetDialogContextType>({
  setAssetPaths: () => {},

  duplicateWarningItems: [],
  setDuplicateWarningItems: () => {},
})

type Props = {
  dialogOpen: boolean
  setDialogOpen: (open: boolean) => void
}

export const AddAssetDialog = ({ dialogOpen, setDialogOpen }: Props) => {
  const {
    tab,
    setTab,
    contextValue,
    form,
    setImageUrls,
    imageUrls,
    existingPaths,
    nonExistingPaths,
    importTaskId,
    onTaskCompleted,
    onTaskCancelled,
    onTaskFailed,
    validatePaths,
    submit,
    submitting,
  } = useAddAssetDialog({ dialogOpen, setDialogOpen })

  return (
    <DialogWrapper
      dialogOpen={dialogOpen}
      setDialogOpen={setDialogOpen}
      tab={tab}
      setTab={setTab}
      preventCloseOnOutsideClick
      contentClassName="max-h-[85vh] max-w-[75vw]"
    >
      <AddAssetDialogContext.Provider value={contextValue}>
        <TabsContent value="selector">
          <AssetPathSelectorTab setTab={setTab} />
        </TabsContent>
        <TabsContent value="form">
          <AddAssetForm
            form={form}
            imageUrls={imageUrls}
            setImageUrls={setImageUrls}
            setTab={setTab}
            closeDialog={() => setDialogOpen(false)}
            validatePaths={validatePaths}
            submit={submit}
            submitting={submitting}
          />
        </TabsContent>
        <TabsContent value="duplicate-warning">
          <DuplicateWarningTab
            setTab={setTab}
            closeDialog={() => setDialogOpen(false)}
          />
        </TabsContent>
        <TabsContent value="path-confirmation">
          <PathConfirmationTab
            existingPaths={existingPaths}
            nonExistingPaths={nonExistingPaths}
            submit={async () => {
              await submit(true)
            }}
            back={() => setTab('form')}
          />
        </TabsContent>
        <TabsContent value="progress" className="max-w-[600px]">
          <ProgressTab
            taskId={importTaskId}
            onCompleted={onTaskCompleted}
            onCancelled={onTaskCancelled}
            onFailed={onTaskFailed}
          />
        </TabsContent>
      </AddAssetDialogContext.Provider>
    </DialogWrapper>
  )
}
