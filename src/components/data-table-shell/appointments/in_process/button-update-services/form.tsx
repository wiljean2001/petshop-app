import { useForm } from 'react-hook-form'
import { IAppointment, IService, IServiceAppointment } from '@/models/schemas.d'
import {
  ServiceAppointmentArraySchema,
  IServiceAppointmentArray,
} from '@/models/schemas.d'
import valibotResolver from '@/lib/valibotResolver'
import { useEffect, useMemo, useState } from 'react'
import { FieldConfig, optionsForDynamicField } from '@/types'
import { showToast } from '@/helpers/toast'
import { getServices } from '@/services/public/services'
import { WithFormDialog } from '@/components/data-table-shell/config'

interface Props {
  isOpen: boolean
  onClose: () => void
  onConfirm: (input: IServiceAppointmentArray) => Promise<boolean>
  title: string
  appointment: IAppointment
}

export default function FormUpdateOnlyServices({
  isOpen,
  onClose,
  onConfirm,
  title,
  appointment,
}: Props) {
  const [services, setServices] = useState<IService[]>([]) // Asumiendo que ISpecies es tu tipo para especies
  const form = useForm<IServiceAppointmentArray>({
    resolver: valibotResolver(ServiceAppointmentArraySchema),
    defaultValues: {},
  })

  useEffect(() => {
    console.log(
      '🚀 ~ file: form.tsx:38 ~ useEffect ~ appointment:',
      appointment
    )
    if (
      appointment.ServiceAppointments &&
      Array.isArray(appointment.ServiceAppointments)
    ) {
      appointment.ServiceAppointments.forEach(
        (serviceAppointment: any, index: number) => {
          // Asegúrate de que el nombre del campo coincida con el patrón definido en tus inputs
          const fieldName = `service[${index}].name`

          console.log(
            '🚀 ~ file: form.tsx:44 ~ appointment.ServiceAppointments.forEach ~ fieldName:',
            fieldName
          )
          // Aquí, necesitas determinar qué valor asignar, por ejemplo, el ID del servicio o algún otro identificador único
          const fieldValue = serviceAppointment.someUniqueIdentifier

          form.setValue(fieldName as any, true)
        }
      )
    }
  }, [appointment, form, services])

  useEffect(() => {
    const loadServices = async () => {
      try {
        const res = await getServices({ state: 'ACTIVE' }) // Asume que getSpecies es una función que obtiene las especies
        setServices(res)
      } catch (error) {
        console.error('Error al cargar las especies', error)
      }
    }
    if (isOpen) {
      loadServices()
    }
  }, [form, isOpen, onConfirm])

  const inputs = useMemo((): FieldConfig[] => {
    return services.map((service, index) => ({
      type: 'radio',
      name: `service[${index}].name`,
      label: service.name,
    }))
  }, [services])

  const onHandle = async (input: IServiceAppointmentArray) => {
    try {
      if (!(await onConfirm(input))) return
      form.reset()
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
        onClose={() => onClose()}
        onConfirm={onHandle}
      />
    </>
  )
}
