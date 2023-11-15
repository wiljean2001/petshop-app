'use client'

import { DashboardOptions } from '../header-for-tables'
import { useMemo, useState } from 'react'
import { AddSpecie } from './add'

export const HeaderSpecie = () => {
  const [isDialogOpen, setDialogOpen] = useState(false)

  const options = useMemo(() => {
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
      <DashboardOptions options={options} onHandledDownload=''>
        <AddSpecie isOpen={isDialogOpen} onClose={() => setDialogOpen(false)} />
      </DashboardOptions>
    </>
  )
}
