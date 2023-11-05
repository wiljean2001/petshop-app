'use client'

import * as React from 'react'
import { type ColumnDef } from '@tanstack/react-table'

import { Checkbox } from '@/components/ui/checkbox'

import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
import { MillionDataTable } from '@/components/data-table/million-data-table'
import { IPet, IBreed, IOwner } from '@/models/schemas'
import { DropdownMenuShell } from '../drop-down-menu-shell'
import { OPTIONS_CRUD } from '@/config/const'
import { ConfirmDeleteDialog } from '../config'
import { deletePet } from '@/services/admin/pets'
import { showToast } from '@/helpers/toast'
import { useRouter } from 'next/navigation'
import { getDateToString } from '@/lib/times'
import { FormPet } from './form'

interface PetsTableShellProps {
  data: IPet[]
  pageCount: number
}

export function PetsTableShell({ data, pageCount }: PetsTableShellProps) {
  const router = useRouter()
  const [isPending, startTransition] = React.useTransition()
  const [dialog, setDialog] = React.useState<{
    type: OPTIONS_CRUD | null
    isOpen: boolean
    petId?: string
    pet?: IPet
  }>({
    type: null,
    isOpen: false,
    petId: '',
    pet: undefined,
  })

  const handleDialogClose = () => {
    setDialog((prevState) => ({
      ...prevState,
      isOpen: false,
      petId: '',
      pet: undefined,
    }))
  }
  const handleDialogConfirm = () => {
    if (dialog.type === OPTIONS_CRUD.DELETE) deleteClinic(dialog.petId)
    if (dialog.type === OPTIONS_CRUD.UPDATE) updateClinic(dialog.pet)
    handleDialogClose()
  }

  const deleteClinic = async (id?: string | null) => {
    try {
      if (!id) return
      // delete pet
      const res = await deletePet({ id })
      if (res) {
        showToast('Horario eliminado con éxito', 'success')
        return router.refresh()
      }
    } catch (error) {}
    return showToast('Error: raza no eliminada', 'error')
  }
  const updateClinic = (pet?: IPet | null) => {
    if (pet) {
      // delete pet
    }
  }

  // Memoize the columns so they don't re-render on every render
  const columns = React.useMemo<ColumnDef<IPet, unknown>[]>(
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
          <div className='max-w-[200px]'>{row.getValue('name')}</div>
        ),
      },
      {
        accessorKey: 'gender',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='Género' />
        ),
        cell: ({ row }) => (
          <div className='max-w-[200px]'>{row.getValue('gender')}</div>
        ),
      },
      {
        accessorKey: 'birthdate',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='F. nacimiento' />
        ),
        cell: ({ row }) => (
          <div className='w-[150px] max-w-[200px]'>
            {getDateToString({ date: row.getValue('birthdate') })}
          </div>
        ),
      },
      {
        accessorKey: 'owner',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='Dueño' />
        ),
        cell: ({ row }) => (
          <div className='w-[200px] max-w-[200px]'>
            {(row.getValue('owner') as IOwner).name}{' '}
            {(row.getValue('owner') as IOwner).surname}
          </div>
        ),
      },
      {
        accessorKey: 'breed',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='Raza' />
        ),
        cell: ({ row }) => (
          <div className='w-[100px] max-w-[200px]'>
            {(row.getValue('breed') as IBreed).name}
          </div>
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

          return (
            <div className='flex space-x-2'>
              {/* {label && <Badge variant="outline">{label}</Badge>} */}
              <span className='max-w-[500px] truncate font-medium'>
                {getDateToString({ date: row.getValue('createdAt') })}
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

          return (
            <div className='flex space-x-2'>
              {/* {label && <Badge variant="outline">{label}</Badge>} */}
              <span className='max-w-[500px] truncate font-medium'>
                {getDateToString({ date: row.getValue('updatedAt') })}
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
                  // Open de dialog box for editing the pet
                  // form.setValue('name', row.getValue('name'))
                  // form.setValue('birthdate', row.getValue('birthdate'))
                  // ...
                  setDialog({
                    type: OPTIONS_CRUD.UPDATE,
                    pet: row.original,
                    isOpen: true,
                  })
                },
              },
              {
                title: 'Eliminar',
                onHandle: () => {
                  // Open de dialog box for deleting the pet
                  // setClinicIdToDelete(row.original.id!) // Asume que `row.id` es el id de la clínica
                  // setDialogOpen(true)
                  setDialog({
                    type: OPTIONS_CRUD.DELETE,
                    petId: row.original.id!,
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
            title: 'raza',
          },
        ]}
      />
      {/* For delete pet */}
      {dialog.type === OPTIONS_CRUD.DELETE && (
        <ConfirmDeleteDialog
          isOpen={dialog.isOpen}
          onClose={() => handleDialogClose()}
          onConfirm={() => handleDialogConfirm()}
        />
      )}
      {/* For edit pet */}
      {dialog.type === OPTIONS_CRUD.UPDATE && (
        <FormPet
          title='Editar raza:'
          isOpen={dialog.isOpen}
          onClose={() => handleDialogClose()}
          onConfirm={() => handleDialogConfirm()}
          initialValues={dialog.pet}
        />
      )}
    </>
  )
}
