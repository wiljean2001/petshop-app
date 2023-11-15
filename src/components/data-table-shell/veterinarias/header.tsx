'use client'

import { DashboardOptions } from '../header-for-tables'
import { useMemo, useState } from 'react'
import { AddVeterinarian } from './add'
export const HeaderVeterinarian = () => {
  const [isDialogOpen, setDialogOpen] = useState(false)

  const options = useMemo(() => {
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
      <DashboardOptions options={options} onHandledDownload=''>
        <AddVeterinarian
          isOpen={isDialogOpen}
          onClose={() => setDialogOpen(false)}
        />
      </DashboardOptions>
    </>
  )
}
