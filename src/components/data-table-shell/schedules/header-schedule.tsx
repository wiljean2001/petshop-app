'use client'

import { HeaderWithButton } from '../header-for-tables'
import { useMemo, useState } from 'react'
import { AddSchedule } from './add-schedule'

export const HeaderSchedule = () => {
  const [isDialogOpen, setDialogOpen] = useState(false)

  const optionsClinics = useMemo(() => {
    return [
      {
        title: 'Agregar horario',
        onHandled: async () => {
          setDialogOpen(true)
        },
      },
      // { title: 'Importar horarios', onHandled: async () => {} },
    ]
  }, [])

  return (
    <>
      <HeaderWithButton options={optionsClinics} title='Horarios' />
      <AddSchedule isOpen={isDialogOpen} onClose={() => setDialogOpen(false)} />
    </>
  )
}
