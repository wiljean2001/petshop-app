import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { getCurrentUser } from '@/helpers/get-server-session'
import { db } from '@/lib/prisma'
import { getDateToString } from '@/lib/times'

export default async function AppointmentsUserPage() {
  const user = await getCurrentUser()

  const owners = await db.user.findUnique({
    where: { id: user?.id },
    select: {
      Owner: {
        select: {
          id: true,
          name: true,
          surname: true,
          Pet: {
            select: {
              name: true,
              id: true,
              Appointments: {
                orderBy: { scheduledDateTime: 'desc' },
                select: {
                  id: true,
                  scheduledDateTime: true,
                  beginningDateTime: true,
                  status: true,
                  Attendances: {
                    select: {
                      Prescription: {
                        select: {
                          instructions: true,
                          prescribedItem: true,
                          id: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  })

  return (
    <div className='flex flex-col break-words w-full my-6 p-4 shadow-lg rounded-sm bg-card'>
      <h2 className='text-2xl font-bold'>Mis citas</h2>
      <hr className='mt-5 pl-3 my-4 md:min-w-full' />

      <div className='p-4'>
        {owners?.Owner && owners.Owner.length > 0 ? (
          owners.Owner.map((owner) => (
            <Collapsible key={owner.id}>
              <div className='flex items-center space-x-4 px-4'>
                <CollapsibleTrigger asChild>
                  <Button variant='ghost' size='sm'>
                    <h4 className='text-sm font-semibold'>{`${owner.name} ${owner.surname}`}</h4>
                    <Icons.chevronDownIcon className='h-4 w-4' />
                    <span className='sr-only'>Toggle</span>
                  </Button>
                </CollapsibleTrigger>
              </div>
              <CollapsibleContent className='container'>
                <ul className='grid gap-4'>
                  {owner.Pet &&
                    owner.Pet.length > 0 &&
                    owner.Pet.map((pet) => (
                      <li key={pet.id}>
                        <h5 className='font-bold'>{pet?.name}</h5>
                        {pet.Appointments.map((appointment) => (
                          <div key={appointment.id} className='mt-2'>
                            <p>{`Fecha programada: ${
                              getDateToString({
                                date: appointment.scheduledDateTime,
                              }).formattedDate
                            }`}</p>
                            <p>{`Estado: ${appointment.status}`}</p>
                            {appointment.beginningDateTime && (
                              <p>{`Fecha de realización: ${
                                getDateToString({
                                  date: appointment.beginningDateTime,
                                }).formattedDate
                              }`}</p>
                            )}

                            {appointment.Attendances && (
                              <>
                                <h5 className='font-bold'>Receta:</h5>
                                {appointment.Attendances.Prescription && (
                                  <p>{`Instrucciones: ${appointment.Attendances.Prescription.instructions}`}</p>
                                )}
                                {appointment.Attendances.Prescription &&
                                  appointment.Attendances.Prescription
                                    .prescribedItem &&
                                  appointment.Attendances.Prescription.prescribedItem.map(
                                    (item) => (
                                      <>
                                        <h5 className='font-bold'>Detalles:</h5>
                                        <p
                                          key={item.id}
                                        >{`Instrucción: ${item.instructions}`}</p>
                                        <p
                                          key={item.id}
                                        >{`Descripción: ${item.description}`}</p>
                                        {item.dosage && (
                                          <p
                                            key={item.id}
                                          >{`dosis: ${item.dosage}`}</p>
                                        )}
                                        <p>{`Iniciar en: ${
                                          getDateToString({
                                            date: item.startDate,
                                          }).formattedDate
                                        }`}</p>
                                        <p>{`Finalizar en: ${
                                          getDateToString({
                                            date: item.endDate,
                                          }).formattedDate
                                        }`}</p>
                                      </>
                                    )
                                  )}
                              </>
                            )}
                          </div>
                        ))}
                      </li>
                    ))}
                </ul>
              </CollapsibleContent>
            </Collapsible>
          ))
        ) : (
          <p>No se encontraron propietarios o mascotas.</p>
        )}
      </div>
    </div>
  )
}
