'use client'

import { DashboardOptions } from '../header-for-tables'
import { useMemo, useState } from 'react'
import { AddOwner } from './add'
import { IUserRestrict } from '@/models/user'

export const HeaderOwner = ({ users }: { users: IUserRestrict[] }) => {
  const [isDialogOpen, setDialogOpen] = useState(false)

  const options = useMemo(() => {
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
      <DashboardOptions options={options} onHandledDownload=''>
        <AddOwner
          isOpen={isDialogOpen}
          onClose={() => setDialogOpen(false)}
          users={users}
        />
      </DashboardOptions>
    </>
  )
}
