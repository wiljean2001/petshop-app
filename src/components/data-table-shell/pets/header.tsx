'use client'

import { DashboardOptions } from '../header-for-tables'
import { useMemo, useState } from 'react'
import { AddPet } from './add'

export const HeaderPet = () => {
  const [isDialogOpen, setDialogOpen] = useState(false)

  const options = useMemo(() => {
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
    <DashboardOptions options={options} onHandledDownload=''>
      <AddPet isOpen={isDialogOpen} onClose={() => setDialogOpen(false)} />
    </DashboardOptions>
    </>
  )
}
