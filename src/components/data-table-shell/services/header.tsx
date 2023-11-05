'use client'

import { HeaderWithButton } from '../header-for-tables'
import { useMemo, useState } from 'react'
import { AddService } from './add'

export const HeaderService = () => {
  const [isDialogOpen, setDialogOpen] = useState(false)

  const optionsServices = useMemo(() => {
    return [
      {
        title: 'Agregar servicio',
        onHandled: async () => {
          setDialogOpen(true)
        },
      },
      // { title: 'Importar horarios', onHandled: async () => {} },
    ]
  }, [])

  return (
    <>
      <HeaderWithButton options={optionsServices} title='Servicios' />
      <AddService isOpen={isDialogOpen} onClose={() => setDialogOpen(false)} />
    </>
  )
}
