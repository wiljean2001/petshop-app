'use client'

import { HeaderWithButton } from '../header-for-tables'
import { useMemo, useState } from 'react'
import { AddOwner } from './add'

export const HeaderOwner = () => {
  const [isDialogOpen, setDialogOpen] = useState(false)

  const optionsOwners = useMemo(() => {
    return [
      {
        title: 'Agregar dueño',
        onHandled: async () => {
          setDialogOpen(true)
        },
      },
      // { title: 'Importar horarios', onHandled: async () => {} },
    ]
  }, [])

  return (
    <>
      <HeaderWithButton options={optionsOwners} title='Dueños' />
      <AddOwner isOpen={isDialogOpen} onClose={() => setDialogOpen(false)} />
    </>
  )
}
