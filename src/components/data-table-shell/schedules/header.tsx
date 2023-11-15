'use client'

import { DashboardOptions } from '../header-for-tables'
import { useMemo, useState } from 'react'
import { AddSchedule } from './add'

export const HeaderSchedule = () => {
  const [isDialogOpen, setDialogOpen] = useState(false)

  const options = useMemo(() => {
    return [
      {
        title: 'Agregar horario',
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
        <AddSchedule
          isOpen={isDialogOpen}
          onClose={() => setDialogOpen(false)}
        />
      </DashboardOptions>
    </>
  )
}
