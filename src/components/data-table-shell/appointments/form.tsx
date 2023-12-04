import { useForm } from 'react-hook-form'
import { IPet, IService, IVeterinarian } from '@/models/schemas.d'
import {
  AppointmentWithServiceSchema,
  IAppointmentWithService,
} from '@/models/schemas.d'
import valibotResolver from '@/lib/valibotResolver'
import { useEffect, useMemo, useState } from 'react'
import { FieldConfig } from '@/types'
import { showToast } from '@/helpers/toast'
import { AppointmentStatusOptions } from '@/config/const'
import { getPets } from '@/services/admin/pets'
import { getVeterinarians } from '@/services/admin/veterinarias'
import { useClinicSchedule } from '@/hooks/use-clinic-schedule'
import { getServices } from '@/services/public/services'
import { WithFormDialog } from '../config'

interface Props {
  isOpen: boolean
  onClose: () => void
  onConfirm: (input: IAppointmentWithService) => Promise<boolean>
  title: string
}

export default function FormAppointment({
  isOpen,
  onClose,
  onConfirm,
  title,
}: Props) {
  const [pets, setPets] = useState<IPet[]>([]) // Asumiendo que ISpecies es tu tipo para especies
  const [vets, setVets] = useState<IVeterinarian[]>([]) // Asumiendo que ISpecies es tu tipo para especies
  const [services, setServices] = useState<IService[]>([]) // Asumiendo que ISpecies es tu tipo para especies
  const [selectedClinic, setSelectedClinic] = useState<string | undefined>(
    undefined
  )

  const form = useForm<IAppointmentWithService>({
    resolver: valibotResolver(AppointmentWithServiceSchema),
    defaultValues: {},
  })

  useEffect(() => {
    const loadPets = async () => {
      try {
        const res = await getPets({}) // Asume que getSpecies es una función que obtiene las especies
        setPets(res)
      } catch (error) {
        console.error('Error al cargar las especies', error)
      }
    }

    const loadVets = async () => {
      try {
        const res = await getVeterinarians({}) // Asume que getSpecies es una función que obtiene las especies
        setVets(res)
      } catch (error) {
        console.error('Error al cargar las especies', error)
      }
    }

    const loadServices = async () => {
      try {
        const res = await getServices({ state: 'ACTIVE' }) // Asume que getSpecies es una función que obtiene las especies
        setServices(res)
      } catch (error) {
        console.error('Error al cargar las especies', error)
      }
    }
    if (isOpen) {
      loadPets()
      loadVets()
      loadServices()
    }
  }, [form, isOpen, onConfirm])

  const { disabledDays, enabledHours } = useClinicSchedule(selectedClinic)

  useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      // When input with name 'vetId' changed, update the state selectedClinic
      if (name === 'vetId') {
        const selectedVet = vets.find((vet) => vet.id === value.vetId)
        if (selectedVet) {
          setSelectedClinic(selectedVet.clinicId)
        }
      }

      if (
        value.services &&
        Array.isArray(value.services) &&
        value.services.length > 0
      ) {
        value.services.forEach((serviceInput, index) => {
          if (name === `services[${index}].serviceId`) {
            const selectedService = services.find(
              (ser) => ser.id === serviceInput?.serviceId
            )
            if (selectedService) {
              // Set the input services ->
              form.setValue(
                `services[${index}].cost` as any,
                selectedService.cost
              )
            }
          }
        })
      }
    })

    return () => subscription.unsubscribe()
  }, [form, services, vets])

  const inputs = useMemo((): FieldConfig[] => {
    return [
      {
        type: 'select',
        name: 'petId',
        label: 'Mascota:',
        isMultiple: false,
        options: pets.map((p) => ({
          value: p.id!,
          label:
            p.name +
            ' - ' +
            p.breed?.name +
            ' | ' +
            p.owner?.surname +
            ' ' +
            p.owner?.name,
        })),
      },
      {
        type: 'select',
        name: 'vetId',
        label: 'Veterinario:',
        isMultiple: false,
        options: vets.map((p) => ({
          value: p.id!,
          label: p.name + ' ' + p.surname + ' | ' + p.specialty,
        })),
      },
      {
        type: 'date',
        name: 'scheduledDateTime',
        label: 'Fecha y hora:',
        withTime: true,
        modifiers: {
          disabled: (day: Date) => {
            // Crear una fecha para "hoy" que solo tenga año, mes y día (sin tiempo)
            const today = new Date()
            today.setHours(0, 0, 0, 0)

            // Comprueba si 'day' está en disabledDays
            const isDayInDisabledDays =
              disabledDays.indexOf(day.getDay()) !== -1

            // Si 'day' está en disabledDays, entonces verifica si 'day' es menor o igual a 'today'
            if (isDayInDisabledDays) {
              return day < today
            }

            // Si 'day' no está en disabledDays, entonces no aplica la restricción
            return true
          },
        },
        modifiersTimes: {
          minTime: enabledHours.minTime ? enabledHours.minTime : '00',
          maxTime: enabledHours.maxTime ? enabledHours.maxTime : '00',
        },
      },
      {
        type: 'select',
        name: 'status',
        label: 'Estado:',
        isMultiple: false,
        /**
         * @options {array} - Array of appointments with only the first appointment
         */
        options: AppointmentStatusOptions.filter((key) => {
          return ['PENDING', 'CONFIRMED'].includes(key.value)
        }),
      },
      {
        type: 'dynamic',
        name: 'services',
        withButtons: true,
        options: [
          {
            id: `dynamic-${Date.now()}`,
            config: [
              {
                type: 'select',
                name: 'serviceId',
                isMultiple: false,
                label: 'Servicios:',
                options: services.map((s) => ({
                  value: s.id!,
                  label: s.name,
                })),
              },
              {
                type: 'number',
                name: 'cost',
                label: 'Costo: (S/)',
                placeholder: 'Precio estimado',
                max: '10000',
                min: '0',
                step: '0.1',
              },
              {
                type: 'area',
                name: 'details',
                label: 'Detalles:',
                placeholder: 'Ingresar detalles.',
              },
            ],
          },
        ],
      },
    ]
  }, [pets, vets, disabledDays, services, enabledHours])

  const onHandle = async (input: IAppointmentWithService) => {
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
