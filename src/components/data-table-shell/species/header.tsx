'use client'

import { HeaderWithButton } from '../header-for-tables'
import { useMemo, useState } from 'react'
import { AddSpecie } from './add'

export const HeaderSpecie = () => {
  const [isDialogOpen, setDialogOpen] = useState(false)

  const optionsSpecies = useMemo(() => {
    return [
      {
        title: 'Agregar especie',
        onHandled: async () => {
          setDialogOpen(true)
        },
      },
      // { title: 'Importar horarios', onHandled: async () => {} },
    ]
  }, [])

  return (
    <>
      <HeaderWithButton options={optionsSpecies} title='Especies' />
      <AddSpecie isOpen={isDialogOpen} onClose={() => setDialogOpen(false)} />
    </>
  )
}
