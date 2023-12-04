import React from 'react'
import {
  APPOINTMENTSTATUSTRANSLATIONS,
  AppointmentStatusKey,
  DIAGNOSTICSTATUSTRANSLATIONS,
  DiagnosticStatusKey,
} from '@/config/const'
import { getDateToString } from '@/lib/times'
import { MedicalRecord } from '@/types'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible'
import { Button } from '../ui/button'
import { Icons } from '../icons'

interface AppointmentDetailsProps {
  appointment: MedicalRecord['Appointments'][number]
}

const AppointmentDetails: React.FC<AppointmentDetailsProps> = ({
  appointment,
}) => {
  return (
    <div>
      <Collapsible>
        <div className='flex items-center space-x-4 px-4'>
          <CollapsibleTrigger asChild>
            <Button variant='ghost' size='sm' className=''>
              <h4 className='text-sm font-semibold'>
                {getDateToString({ date: appointment.beginningDateTime })
                  .formattedDate ??
                  getDateToString({ date: appointment.scheduledDateTime })
                    .formattedDate}
              </h4>
              <Icons.chevronDownIcon className='h-4 w-4' />
              <span className='sr-only'>Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className='container'>
          <div className='mb-4'>
            <p className='text-sm text-gray-600 dark:text-gray-300'>
              <strong>Estado:</strong>{' '}
              {
                APPOINTMENTSTATUSTRANSLATIONS[
                  appointment.status as AppointmentStatusKey
                ]
              }
            </p>
            <p className='text-sm text-gray-600 dark:text-gray-300'>
              <strong>Fecha de programación:</strong>{' '}
              {
                getDateToString({ date: appointment.scheduledDateTime })
                  .formattedDate
              }
            </p>
            <p className='text-sm text-gray-600 dark:text-gray-300'>
              <strong>Fecha de iniciación:</strong>{' '}
              {getDateToString({ date: appointment.beginningDateTime })
                .formattedDate ?? 'Atención no realizada'}
            </p>
            <p className='text-sm text-gray-600 dark:text-gray-300'>
              <strong>Veterinario:</strong> {appointment.veterinarian.name}{' '}
              {appointment.veterinarian.surname}
            </p>
            <p className='text-sm text-gray-600 dark:text-gray-300'>
              <strong>Especialidad:</strong>{' '}
              {appointment.veterinarian.specialty}
            </p>
          </div>

          <h2 className='text-xl font-semibold my-2'>Servicios Aplicados</h2>
          {appointment.ServiceAppointments.map((serviceAppointment) => (
            <div
              className='bg-gray-100 dark:bg-gray-800 p-3 rounded-md my-2'
              key={serviceAppointment.id}
            >
              <p className='text-sm text-gray-600 dark:text-gray-300'>
                <strong>Servicio:</strong> {serviceAppointment.service.name}
              </p>
              <p className='text-sm text-gray-600 dark:text-gray-300'>
                <strong>Detalles:</strong>{' '}
                {serviceAppointment.details ?? 'No hay detalles.'}
              </p>
              {/* Agregar más detalles del servicio aquí si es necesario */}
            </div>
          ))}

          {appointment.Attendances && (
            <div className='mb-4'>
              <h2 className='text-xl font-semibold my-2'>Diagnóstico</h2>
              <div className='bg-gray-100 dark:bg-gray-800 p-3 rounded-md my-2'>
                <p className='text-sm text-gray-600 dark:text-gray-300'>
                  <strong>Descripción:</strong>{' '}
                  {appointment.Attendances.Diagnostics?.description}
                </p>
                <p className='text-sm text-gray-600 dark:text-gray-300'>
                  <strong>Estado:</strong>{' '}
                  {
                    DIAGNOSTICSTATUSTRANSLATIONS[
                      appointment.Attendances.Diagnostics
                        ?.status as DiagnosticStatusKey
                    ]
                  }
                </p>
              </div>
            </div>
          )}

          {appointment.Attendances && appointment.Attendances.Prescription && (
            <div className='mb-4'>
              <h2 className='text-xl font-semibold my-2'>Recomendaciones</h2>
              {/* Detalles de la prescripción */}
              <p className='text-sm text-gray-600 dark:text-gray-300'>
                <strong>Instrucciones:</strong>{' '}
                {appointment.Attendances.Prescription.instructions}
              </p>
              {appointment.Attendances.Prescription.prescribedItem &&
                appointment.Attendances.Prescription.prescribedItem.map(
                  (item, index) => (
                    <div
                      key={item.id}
                      className='bg-gray-100 dark:bg-gray-800 p-3 rounded-md my-2'
                    >
                      <h2 className='text-xl font-semibold my-2'>
                        Instrucción {index + 1}
                      </h2>
                      <p className='text-sm text-gray-600 dark:text-gray-300'>
                        <strong>Instrucción:</strong> {item.instructions}
                      </p>
                      <p className='text-sm text-gray-600 dark:text-gray-300'>
                        <strong>Descripción:</strong> {item.description}
                      </p>
                      <p className='text-sm text-gray-600 dark:text-gray-300'>
                        <strong>Dósis:</strong> {item.dosage}
                      </p>
                      <p className='text-sm text-gray-600 dark:text-gray-300'>
                        <strong>Tipo de instrucción:</strong> {item.type}
                      </p>
                      <p className='text-sm text-gray-600 dark:text-gray-300'>
                        <strong>Fecha de iniciación:</strong>{' '}
                        {
                          getDateToString({ date: item.startDate })
                            .formattedDate
                        }
                      </p>
                      <p className='text-sm text-gray-600 dark:text-gray-300'>
                        <strong>Fecha de finalización:</strong>{' '}
                        {getDateToString({ date: item.endDate }).formattedDate}
                      </p>
                    </div>
                  )
                )}
            </div>
          )}
        </CollapsibleContent>
      </Collapsible>
    </div>
  )
}

export default AppointmentDetails
