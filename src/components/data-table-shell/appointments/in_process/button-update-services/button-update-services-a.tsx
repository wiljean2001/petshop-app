import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { DialogUpdateOnlyServices } from './update-services-appointment'
import { IAppointment } from '@/models/schemas'

export default function ButtonUpdateOnlyServices({
  appointment,
}: {
  appointment: IAppointment
}) {
  // apointmentId
  const [isDialogOpen, setDialogOpen] = useState(false)

  const handleSubmit = () => {
    setDialogOpen(true)
  }

  return (
    <>
      <Button onClick={() => handleSubmit()}>Servicios aplicados</Button>
      <DialogUpdateOnlyServices
        appointment={appointment}
        isOpen={isDialogOpen}
        onClose={() => setDialogOpen(false)}
      />
    </>
  )
}
