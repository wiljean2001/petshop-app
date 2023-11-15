'use client'

import { DashboardOptions } from '../header-for-tables'
import { Suspense, useMemo, useState } from 'react'
// import { AddAppointment } from './add'

export const HeaderAppointment = () => {
  const [isDialogOpen, setDialogOpen] = useState(false)

  // const options = useMemo(() => {
  //   return [
  //     {
  //       title: 'Importar citas',
  //       onHandled: async () => {
  //         setDialogOpen(true)
  //       },
  //     },
  //     // { title: 'Importar horarios', onHandled: async () => {} },
  //   ]
  // }, [])  

  return (
    <>
      <DashboardOptions onHandledDownload=''>
        {/* <AddAppointment
          isOpen={isDialogOpen}
          onClose={() => setDialogOpen(false)}
        /> */}
        {/* Form with date fields */}

      </DashboardOptions>
    </>
  )
}
