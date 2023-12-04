'use client'

import { DashboardOptions } from '../header-for-tables'
import { Suspense, lazy, useMemo, useState } from 'react'
// import { AddBreed } from './add'

const AddBreed = lazy(() => import('./add'))

export const HeaderBreed = () => {
  const [isDialogOpen, setDialogOpen] = useState(false)

  const options = useMemo(() => {
    return [
      {
        title: 'Agregar raza',
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
        <Suspense fallback={<></>}>
          <AddBreed
            isOpen={isDialogOpen}
            onClose={() => setDialogOpen(false)}
          />
        </Suspense>
      </DashboardOptions>
    </>
  )
}
