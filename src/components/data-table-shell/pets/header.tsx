'use client'

import { HeaderWithButton } from '../header-for-tables'
import { useMemo, useState } from 'react'
import { AddPet } from './add'

export const HeaderPet = () => {
  const [isDialogOpen, setDialogOpen] = useState(false)

  const optionsPets = useMemo(() => {
    return [
      {
        title: 'Agregar mascota',
        onHandled: async () => {
          setDialogOpen(true)
        },
      },
      // { title: 'Importar horarios', onHandled: async () => {} },
    ]
  }, [])

  return (
    <>
      <HeaderWithButton options={optionsPets} title='Mascotas' />
      <AddPet isOpen={isDialogOpen} onClose={() => setDialogOpen(false)} />
    </>
  )
}
