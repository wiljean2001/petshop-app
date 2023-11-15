import { useForm } from 'react-hook-form'
import { ServiceSchema, IService, IServiceDetail } from '@/models/schemas'
import valibotResolver from '@/lib/valibotResolver'
import { useEffect, useMemo } from 'react'
import { WithFormDialog } from '../config'
import { FieldConfig } from '@/types'
import {
  SERVICESTATUSTRANSLATIONS,
  ServiceStatusKey,
} from '../../../config/const'
import { showToast } from '@/helpers/toast'

interface Props {
  isOpen: boolean
  onClose: () => void
  onConfirm: (input: IService) => Promise<boolean>
  title: string
  initialValues?: Partial<IService>
}
export const FormService = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  initialValues,
}: Props) => {
  const form = useForm<IService>({
    resolver: valibotResolver(ServiceSchema),
    defaultValues: {},
  })

  useEffect(() => {
    if (initialValues && form) {
      Object.keys(initialValues).forEach((key) => {
        form.setValue(
          key as keyof IService,
          initialValues[key as keyof IService]
        )
      })
    }
  }, [form, initialValues])

  const inputs = useMemo((): FieldConfig[] => {
    return [
      {
        type: 'text',
        name: 'name',
        label: 'Nombres:',
        placeholder: 'Nombres',
      },
      {
        type: 'number',
        name: 'duration',
        label: 'Duración: (xMin.)',
        placeholder: 'Duración estimada',
        min: 0,
        max: 20000,
        step: '1',
      },
      {
        type: 'number',
        name: 'cost',
        label: 'Costo: S/',
        placeholder: 'S/ ',
        min: 0,
        max: 20000,
        step: '0.1',
      },
      {
        type: 'area',
        name: 'description',
        label: 'Descripción:',
        placeholder: 'Descripción',
      },
      {
        type: 'select',
        name: 'state',
        isMultiple: false,
        label: 'Estado:',
        options: (
          Object.keys(SERVICESTATUSTRANSLATIONS) as ServiceStatusKey[]
        ).map((key) => ({
          value: key,
          label: SERVICESTATUSTRANSLATIONS[key] as string,
        })),
      },
      {
        type: 'dynamic',
        name: 'ServiceDetails',
        options: [
          {
            type: 'area',
            name: 'value',
            label: 'Detalle:',
            placeholder: 'Detalle:',
          },
          {
            type: 'text',
            name: 'detailType',
            label: 'Tipo de Detalle:',
            placeholder: 'Tipo de Detalle:',
          },
        ],
      },
    ]
  }, [])

  const onHandle = async (input: IService) => {
    try {
      if (!(await onConfirm(input))) return
      form.reset()
      onClose()
    } catch (error) {
      showToast(
        'Error: No se pudo realizar la acción. Por favor, inténtalo de nuevo.',
        'error'
      )
    }
  }

  return (
    <>
      <WithFormDialog
        title={title}
        form={{ inputs, form }}
        isOpen={isOpen}
        onClose={() => {
          form.reset()
          onClose()
        }}
        onConfirm={onHandle}
      />
    </>
  )
}
