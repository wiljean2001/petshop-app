'use client'

import { HeaderWithButton } from '../header-for-tables'
import { useMemo, useState } from 'react'
import { AddBreed } from './add'

export const HeaderBreed = () => {
  const [isDialogOpen, setDialogOpen] = useState(false)

  const optionsClinics = useMemo(() => {
    return [
      {
        title: 'Agregar raza',
        onHandled: async () => {
          setDialogOpen(true)
        },
      },
      // { title: 'Importar horarios', onHandled: async () => {} },
    ]
  }, [])

  return (
    <>
      <HeaderWithButton options={optionsClinics} title='Razas' />
      <AddBreed isOpen={isDialogOpen} onClose={() => setDialogOpen(false)} />
    </>
  )
}
