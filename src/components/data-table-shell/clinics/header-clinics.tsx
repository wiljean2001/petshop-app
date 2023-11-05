'use client'

import { HeaderWithButton } from '../header-for-tables'
import { useMemo, useState } from 'react'
import { AddClinic } from './add-clinic'
import { AssignSchedule } from './assign-schedule'
export const HeaderClinics = () => {
  const [isDialogOpen, setDialogOpen] = useState(false)
  const [isDialogOpenAssign, setDialogOpenAssign] = useState(false)

  const optionsClinics = useMemo(() => {
    return [
      {
        title: 'Agregar clinica',
        onHandled: async () => {
          setDialogOpen(true)
        },
      },
      {
        title: 'Asignar horarios',
        onHandled: async () => {
          setDialogOpenAssign(true)
        },
      },
      { title: 'Importar clinicas', onHandled: async () => {} },
    ]
  }, [])

  return (
    <>
      <HeaderWithButton options={optionsClinics} title='Clínicas' />
      <AddClinic isOpen={isDialogOpen} onClose={() => setDialogOpen(false)} />
      <AssignSchedule
        isOpen={isDialogOpenAssign}
        onClose={() => setDialogOpenAssign(false)}
      />
    </>
  )
}
