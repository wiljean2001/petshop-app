'use client'

import {
  IAppointment,
  IService,
  IServiceAppointmentArray,
} from '@/models/schemas.d'
import FormAttendances from './form-attendance'
import { DashboardHeader } from '@/components/layout/auth/header'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { getServices } from '@/services/public/services'
import { showToast } from '@/helpers/toast'
import { SaveServicesWithOptionalClinicalData } from '@/services/admin/appointments/in-process/services'
import ButtonUpdateOnlyServices from './button-update-services/button-update-services-a'
import { useRouter } from 'next/navigation'

interface Props {
  totalServices: number
  appointment: IAppointment
}
export default function FirstContentPage({
  totalServices,
  appointment,
}: Props) {
  const router = useRouter()
  const [services, setServices] = useState<IService[]>([]) // Asumiendo que ISpecies es tu tipo para especies

  useEffect(() => {
    const loadServices = async () => {
      try {
        const res = await getServices({ state: 'ACTIVE' }) // Asume que getSpecies es una función que obtiene las especies
        setServices(res)
      } catch (error) {
        console.error('Error al cargar las especies', error)
      }
    }
    loadServices()
  }, [])

  const handleSaveServices = async (data: IServiceAppointmentArray) => {
    showToast(
      '¿Está seguro de querer guardar estos detalles?. Confirmar acción.',
      'warning',
      async () => {
        try {
          const res = await SaveServicesWithOptionalClinicalData(
            appointment.id!,
            data,
            appointment.beginningDateTime!
          )
          if (res) {
            showToast(
              '¡Éxito! Se registraron los detalles satisfactoriamente.',
              'success'
            )
            router.refresh()
            return false
          }
        } catch (error) {}

        showToast(
          'Advertencia: La cita no se ha registrada completamente. ' +
            'Por favor, completa todos los campos requeridos.',
          'warning'
        )
        return false
      },
      'Confirmar'
    )
    return false
  }

  return (
    // First show the services selected on the appointment and if clinicData is required, then register this
    // Also update the services (cost, etc)
    <>
      <DashboardHeader heading='Servicios' className='my-2'>
        {/* <HeaderAppointment /> */}
        <ButtonUpdateOnlyServices appointment={appointment} />
      </DashboardHeader>

      <FormAttendances
        onConfirm={handleSaveServices}
        totalServices={totalServices}
        appointment={appointment}
        services={services}
      />
    </>
  )
}
