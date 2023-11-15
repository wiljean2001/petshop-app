'use client'

import { DashboardOptions } from '../header-for-tables'
import { useMemo, useState } from 'react'
import { AddClinic } from './add'
export const HeaderClinics = () => {
  const [isDialogOpen, setDialogOpen] = useState(false)

  const options = useMemo(() => {
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
      <DashboardOptions options={options} onHandledDownload=''>
        <AddClinic isOpen={isDialogOpen} onClose={() => setDialogOpen(false)} />
      </DashboardOptions>
    </>
  )
}
