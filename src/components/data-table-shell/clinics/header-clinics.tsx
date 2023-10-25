'use client'

import { HeaderWithButton } from '../header-for-tables'
import { useMemo, useState } from 'react'
import { AddClinic } from './add-clinic'
export const HeaderClinics = () => {
  const [isDialogOpen, setDialogOpen] = useState(false)

  const optionsClinics = useMemo(() => {
    return [
      {
        title: 'Agregar clinica',
        onHandled: async () => {
          setDialogOpen(true)
        },
      },
      { title: 'Importar clinicas', onHandled: async () => {} },
    ]
  }, [])

  return (
    <>
      <HeaderWithButton options={optionsClinics} title='Agregar clínica' />
      <AddClinic isOpen={isDialogOpen} onClose={() => setDialogOpen(false)} />
    </>
  )
}
