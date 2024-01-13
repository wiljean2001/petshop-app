'use client'

import * as React from 'react'
import { type ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
import { MillionDataTable } from '@/components/data-table/million-data-table'
import { IOwner } from '@/models/schemas.d'
import { DropdownMenuShell } from '../drop-down-menu-shell'
import { OPTIONS_CRUD } from '@/config/const'
import { ConfirmDeleteDialog } from '../config'
import { deleteOwner, updateOwner } from '@/services/admin/owners'
import { showToast } from '@/helpers/toast'
import { getDateToString } from '@/lib/times'
import { FormOwner } from './form'
import { useRouter } from 'next/navigation'
import { IUserRestrict } from '@/models/user'

interface OwnersTableShellProps {
  data: IOwner[]
  pageCount: number
  users: IUserRestrict[]
}

export default function OwnersTableShell({
  data,
  pageCount,
  users,
}: OwnersTableShellProps) {
  const route = useRouter()
  const [isPending, startTransition] = React.useTransition()
  const [dialog, setDialog] = React.useState<{
    type: OPTIONS_CRUD | null
    isOpen: boolean
    ownerId?: string
    owner?: IOwner
  }>({
    type: null,
    isOpen: false,
    ownerId: '',
    owner: undefined,
  })

  const handleDialogClose = () => {
    setDialog((prevState) => ({
      ...prevState,
      isOpen: false,
      ownerId: '',
      owner: undefined,
    }))
  }

  const handleDeleteOwner = async (id?: string) => {
    if (!id) return false
    try {
      // delete owner
      const res = await deleteOwner({ id })
      if (res) {
        showToast(
          '¡Éxito! El propietario ha sido eliminado satisfactoriamente.',
          'success'
        )
        route.refresh()
        handleDialogClose()
        return true
      }
      showToast(
        'Advertencia: La eliminación no se completó. Por favor, completa todos los campos requeridos.',
        'warning'
      )
    } catch (error) {
      showToast(
        'Error: No se pudo realizar la acción. Por favor, inténtalo de nuevo.',
        'error'
      )
    }
    return false
  }
  const handleUpdateOwner = async (owner?: IOwner): Promise<boolean> => {
    if (!owner) return false
    const res = await updateOwner({ input: owner })
    if (res) {
      showToast(
        '¡Éxito! El propietario ha sido actualizada satisfactoriamente.',
        'success'
      )
      route.refresh()
      return true
    }
    showToast(
      'Advertencia: La actualización no se completó. Por favor, completa todos los campos requeridos.',
      'warning'
    )
    return false
  }

  // Memoize the columns so they don't re-render on every render
  const columns = React.useMemo<ColumnDef<IOwner, unknown>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label='Select all'
            className='translate-y-[2px]'
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label='Select row'
            className='translate-y-[2px]'
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: 'name',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='Nombres' />
        ),
        cell: ({ row }) => (
          <div className='min-w-[200px] max-w-[200px]'>
            {row.getValue('name')}
          </div>
        ),
      },
      {
        accessorKey: 'surname',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='Apellidos' />
        ),
        cell: ({ row }) => (
          <div className='min-w-[200px] max-w-[200px]'>
            {row.getValue('surname')}
          </div>
        ),
      },
      {
        accessorKey: 'email',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='Correo e.' />
        ),
        cell: ({ row }) => (
          <div className='min-w-[200px] max-w-[200px]'>
            {row.getValue('email')}
          </div>
        ),
      },
      {
        accessorKey: 'phone',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='Telf.' />
        ),
        cell: ({ row }) => (
          <div className='min-w-[200px] max-w-[200px]'>
            {row.getValue('phone')}
          </div>
        ),
      },
      {
        accessorKey: 'address',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='Dirección' />
        ),
        cell: ({ row }) => (
          <div className='w-[200px] max-w-[200px]'>
            {row.getValue('address')}
          </div>
        ),
      },
      {
        accessorKey: 'city',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='Ciudad' />
        ),
        cell: ({ row }) => (
          <div className='w-[200px] max-w-[200px]'>{row.getValue('city')}</div>
        ),
      },
      {
        accessorKey: 'createdAt',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='F. creación' />
        ),
        cell: ({ row }) => {
          // const label = tasks.label.enumValues.find(
          //   (label) => label === row.original.label
          // )
          const date = getDateToString({ date: row.getValue('createdAt') })
          return (
            <div className='flex space-x-2'>
              {/* {label && <Badge variant="outline">{label}</Badge>} */}
              <span className='max-w-[500px] truncate font-medium'>
                {!date.error && date.formattedDate}
              </span>
            </div>
          )
        },
      },
      {
        accessorKey: 'updatedAt',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='F. act.' />
        ),
        cell: ({ row }) => {
          // const label = tasks.label.enumValues.find(
          //   (label) => label === row.original.label
          // )
          const date = getDateToString({ date: row.getValue('updatedAt') })
          return (
            <div className='flex space-x-2'>
              {/* {label && <Badge variant="outline">{label}</Badge>} */}
              <span className='max-w-[500px] truncate font-medium'>
                {!date.error && date.formattedDate}
              </span>
            </div>
          )
        },
      },
      {
        id: 'actions',
        cell: ({ row }) => (
          <DropdownMenuShell
            items={[
              {
                title: 'Editar',
                onHandle: () => {
                  // Open de dialog box for editing the owner
                  setDialog({
                    type: OPTIONS_CRUD.UPDATE,
                    owner: row.original,
                    isOpen: true,
                  })
                },
              },
              {
                title: 'Eliminar',
                onHandle: () => {
                  // Open de dialog box for deleting the owner
                  // setownerIdToDelete(row.original.id!) // Asume que `row.id` es el id de la clínica
                  // setDialogOpen(true)
                  setDialog({
                    type: OPTIONS_CRUD.DELETE,
                    ownerId: row.original.id!,
                    isOpen: true,
                  })
                },
              },
              {
                title: 'Marcar y copiar',
                onHandle: () => {},
                withDivider: true,
              },
            ]}
          />
        ),
      },
    ],
    [isPending]
  )

  return (
    <>
      <MillionDataTable
        columns={columns}
        data={data}
        pageCount={pageCount}
        filterableColumns={[]}
        searchableColumns={[
          {
            id: 'name',
            title: 'por nombres',
          },
          {
            id: 'surname',
            title: 'por apellidos',
          },
          {
            id: 'email',
            title: 'por correo e',
          },
        ]}
      />
      {/* For delete owner */}
      {dialog.type === OPTIONS_CRUD.DELETE && (
        <ConfirmDeleteDialog
          isOpen={dialog.isOpen}
          onClose={() => handleDialogClose()}
          onConfirm={() => handleDeleteOwner(dialog.ownerId)}
        />
      )}
      {/* For edit owner */}
      {dialog.type === OPTIONS_CRUD.UPDATE && (
        <FormOwner
          title='Editar propietario:'
          isOpen={dialog.isOpen}
          onClose={handleDialogClose}
          onConfirm={handleUpdateOwner}
          initialValues={dialog.owner}
          users={users}
        />
      )}
    </>
  )
}
