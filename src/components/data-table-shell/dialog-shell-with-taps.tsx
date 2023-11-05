import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { FieldConfig, ButtonConfig } from '@/types'
import { DynamicForm } from '../forms/dynamic-form'
import { ScrollArea } from '../ui/scroll-area'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs'

// Definiciones de tipos
type CommonProps = {
  isOpen: boolean
  onClose: () => void
}

type TabConfig = {
  label: string
  inputs: FieldConfig[]
}

type DialogShellPropsWithTabs = CommonProps & {
  title: string
  tabsConfig?: TabConfig[]
  form: UseFormReturn<any>
  buttons: ButtonConfig[]
  handleSubmit: (values: any) => void
  onlyButtons: boolean
}

// Componentes más pequeños
const TabsWithForms: React.FC<
  Pick<
    DialogShellPropsWithTabs,
    'tabsConfig' | 'form' | 'buttons' | 'handleSubmit'
  >
> = ({ tabsConfig, form, buttons, handleSubmit }) => {
  return (
    <Tabs defaultValue={tabsConfig![0].label} className='w-full'>
      <TabsList className='grid w-full grid-cols-2'>
        {tabsConfig!.map((tab, index) => (
          <TabsTrigger key={index} value={tab.label}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabsConfig!.map((tab, index) => (
        <TabsContent key={index} value={tab.label}>
          <ScrollArea className='sm:max-h-[520px] px-4'>
            <DynamicForm
              form={form}
              formConfig={tab.inputs}
              onSubmit={handleSubmit}
              buttons={buttons}
            />
          </ScrollArea>
        </TabsContent>
      ))}
    </Tabs>
  )
}

const SingleForm: React.FC<
  Pick<DialogShellPropsWithTabs, 'form' | 'buttons' | 'handleSubmit'>
> = ({ form, buttons, handleSubmit }) => {
  return (
    <ScrollArea className='sm:max-h-[520px] px-4'>
      <DynamicForm
        form={form}
        formConfig={form.getValues()} // Asumiendo que getValues() es la forma de obtener la configuración de campos actual
        onSubmit={handleSubmit}
        buttons={buttons}
      />
    </ScrollArea>
  )
}

// Componente principal DialogShellWithTabs
export const DialogShellWithTabs: React.FC<DialogShellPropsWithTabs> = ({
  isOpen,
  onClose,
  title,
  tabsConfig,
  form,
  buttons,
  handleSubmit,
  onlyButtons,
}) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
        </AlertDialogHeader>

        {!onlyButtons && tabsConfig ? (
          <TabsWithForms
            tabsConfig={tabsConfig}
            form={form}
            buttons={buttons}
            handleSubmit={handleSubmit}
          />
        ) : !onlyButtons ? (
          <SingleForm
            form={form}
            buttons={buttons}
            handleSubmit={handleSubmit}
          />
        ) : null}

        {onlyButtons && (
          <>
            <Separator />
            <div className='flex gap-2 justify-between w-full p-4'>
              <Button onClick={onClose} size='lg'>
                Cancelar
              </Button>
              <Button
                variant='destructive'
                onClick={() => handleSubmit(form.getValues())} // Asumiendo que getValues() devuelve los valores del formulario
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
