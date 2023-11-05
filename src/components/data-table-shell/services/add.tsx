import { useForm } from 'react-hook-form'
import { ServiceSchema, IService, IServiceDetail } from '@/models/schemas'
import valibotResolver from '@/lib/valibotResolver'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'
import { WithFormDialog } from '../config'
import { FieldConfig } from '@/types'
import { SERVICE_STATES } from '../../../config/const'

interface Props {
  isOpen: boolean
  onClose: () => void
}
export const AddService = ({ isOpen, onClose }: Props) => {
  const route = useRouter()
  const form = useForm<IService>({
    resolver: valibotResolver(ServiceSchema),
    // defaultValues: {},
  })
  type servicesWithDetails = IService & [IServiceDetail]

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
        step: '1',
      },
      {
        type: 'text',
        name: 'description',
        label: 'Descripción:',
        placeholder: 'Descripción',
      },
      {
        type: 'select',
        name: 'state',
        label: 'Estado:',
        options: SERVICE_STATES.map((r) => ({
          value: r,
          label: r,
        })),
      },
      {
        type: 'dynamic',
        name: 'details',
        options: [
          {
            type: 'text',
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
    console.log('🚀 ~ file: add.tsx:84 ~ onHandle ~ input:', input)
    try {
      // const res = await createService({ input })
      // if (res) {
      //   route.refresh()
      //   form.reset()
      //   onClose()
      // }
    } catch (error) {}
  }

  return (
    <>
      <WithFormDialog
        title='Registar servicio:'
        form={{ inputs, form }}
        isOpen={isOpen}
        onClose={() => onClose()}
        onConfirm={onHandle}
      />
    </>
  )
}
