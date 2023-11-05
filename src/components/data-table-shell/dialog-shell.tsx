import { UseFormReturn } from 'react-hook-form'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogHeader,
  AlertDialogDescription,
} from '../ui/alert-dialog'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { ButtonConfig, FieldConfig } from '@/types'
import { DynamicForm } from '../forms/dynamic-form'
import { ScrollArea } from '../ui/scroll-area'

type CommonProps = {
  isOpen: boolean
  onClose: () => void
}
type DialogShellProps =
  | (CommonProps & {
      onlyButtons: false
      title: string
      inputs: FieldConfig[]
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
        <AlertDialogHeader>
          <AlertDialogTitle>{props.title}</AlertDialogTitle>
        </AlertDialogHeader>
        {!props.onlyButtons && (
          <ScrollArea className='sm:max-h-[520px] px-4'>
            <DynamicForm
              form={props.form}
              formConfig={props.inputs}
              onSubmit={props.handleSubmit}
              buttons={props.buttons}
            />
          </ScrollArea>
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
