import { UseFormReturn } from 'react-hook-form'
import CustomForm, { CustomOptionInput } from '../forms/Form'
import { AlertDialog, AlertDialogContent } from '../ui/alert-dialog'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { ButtonConfig } from '@/types'

type CommonProps = {
  isOpen: boolean
  onClose: () => void
}
type DialogShellProps =
  | (CommonProps & {
      onlyButtons: false
      title: string
      inputs: CustomOptionInput[]
      form: UseFormReturn<any>
      buttons: ButtonConfig[]
      handleSubmit: (value: any) => void
    })
  | (CommonProps & {
      onlyButtons: true
      title: string
      handleSubmit: () => void
    })

export const DialogShell: React.FC<DialogShellProps> = (props) => {
  return (
    <AlertDialog open={props.isOpen} onOpenChange={() => props.onClose()}>
      <AlertDialogContent>
        {/* Dialog content to add clinic */}
        <h3>{props.title}</h3>
        {!props.onlyButtons && (
          <>
            <CustomForm
              form={props.form}
              handleSubmit={props.handleSubmit}
              inputsForm={props.inputs}
              buttons={props.buttons}
            />
          </>
        )}
        {props.onlyButtons && (
          <>
            <Separator />
            <div className='flex gap-2 justify-between w-full'>
              <Button onClick={() => props.onClose()} size='lg'>
                Cancelar
              </Button>
              <Button
                variant='destructive'
                onClick={() => props.handleSubmit()}
                size='lg'
              >
                Confirmar
              </Button>
            </div>
          </>
        )}
      </AlertDialogContent>
    </AlertDialog>
  )
}
