'use client'

import { HeaderWithButton } from '../header-for-tables'
import { useMemo, useState } from 'react'
import { AddVeterinarian } from './add-veterinarias'
export const HeaderVeterinarian = () => {
  const [isDialogOpen, setDialogOpen] = useState(false)

  const optionsClinics = useMemo(() => {
    return [
      {
        title: 'Agregar veterinario',
        onHandled: async () => {
          setDialogOpen(true)
        },
      },
      { title: 'Importar veterinarios', onHandled: async () => {} },
    ]
  }, [])

  return (
    <>
      <HeaderWithButton options={optionsClinics} title='Veterinarios' />
      <AddVeterinarian
        isOpen={isDialogOpen}
        onClose={() => setDialogOpen(false)}
      />
    </>
  )
}
