import { UseFormReturn } from 'react-hook-form'
import { DialogShell } from './dialog-shell'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { FieldConfig } from '@/types'
import { showToast } from '@/helpers/toast'

export const ConfirmDeleteDialog = ({
  isOpen,
  onClose,
  onConfirm,
}: {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}) => (
  <DialogShell
    onlyButtons={true}
    title='¿Está seguro que desea realizar la eliminación?'
    isOpen={isOpen}
    onClose={onClose}
    handleSubmit={onConfirm}
  />
)

export const WithFormDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  form,
}: {
  title: string
  form: {
    form: UseFormReturn<any>
    inputs: FieldConfig[]
  }
  isOpen: boolean
  onClose: () => void
  onConfirm: (value: any) => void
}) => {
  return (
    <DialogShell
      onlyButtons={false}
      title={title}
      buttons={[
        {
          title: 'Cerrar',
          onClick: () => onClose(),
          // className: 'col-start-1 col-span-1',
        },
        {
          title: 'Guardar',
          className: `${cn(
            // 'col-start-4 col-span-1',
            buttonVariants({ variant: 'destructive' })
          )}`,
        },
      ]}
      form={form.form}
      inputs={form.inputs}
      isOpen={isOpen}
      onClose={onClose}
      handleSubmit={onConfirm}
    />
  )
}

export const WithManyFormsDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  form,
}: {
  title: string
  form: {
    form: UseFormReturn<any>
    inputs: FieldConfig[]
  }
  isOpen: boolean
  onClose: () => void
  onConfirm: (value: any) => void
}) => {
  return (
    <DialogShell
      onlyButtons={false}
      title={title}
      buttons={[
        {
          title: 'Cerrar',
          onClick: () => onClose(),
          // className: 'col-start-1 col-span-1',
        },
        {
          title: 'Guardar',
          className: `${cn(
            // 'col-start-4 col-span-1',
            buttonVariants({ variant: 'destructive' })
          )}`,
        },
      ]}
      form={form.form}
      inputs={form.inputs}
      isOpen={isOpen}
      onClose={onClose}
      handleSubmit={onConfirm}
    />
  )
}
