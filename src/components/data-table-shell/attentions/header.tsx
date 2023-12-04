'use client'

import { DashboardOptions } from '../header-for-tables'
import { Suspense, useMemo, useState } from 'react'
import { AddBreed } from './add'

export const HeaderBreed = () => {
  const [isDialogOpen, setDialogOpen] = useState(false)

  const options = useMemo(() => {
    return [
      // {
      //   title: 'Agregar raza',
      //   onHandled: async () => {
      //     setDialogOpen(true)
      //   },
      // },
      // { title: 'Importar horarios', onHandled: async () => {} },
    ]
  }, [])

  return (
    <>
      <DashboardOptions options={options} onHandledDownload=''>
        <AddBreed isOpen={isDialogOpen} onClose={() => setDialogOpen(false)} />
      </DashboardOptions>
    </>
  )
}
