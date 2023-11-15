'use client'

import * as React from 'react'
import { type ColumnDef } from '@tanstack/react-table'

import { Checkbox } from '@/components/ui/checkbox'

import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
import { MillionDataTable } from '@/components/data-table/million-data-table'
import { IVeterinarian } from '@/models/schemas'
import { DropdownMenuShell } from '../drop-down-menu-shell'
import { OPTIONS_CRUD } from '@/config/const'
import { ConfirmDeleteDialog } from '../config'

import { getDateToString } from '@/lib/times'
import { FormVeterinarian } from './form'
import { showToast } from '@/helpers/toast'
import { useRouter } from 'next/navigation'
import {
  deleteVeterinarian,
  updateVeterinarian,
} from '@/services/admin/veterinarias'

interface ClinicsTableShellProps {
  data: IVeterinarian[]
  pageCount: number
}

export function VeterinariansTableShell({
  data,
  pageCount,
}: ClinicsTableShellProps) {
  const route = useRouter()
  const [isPending, startTransition] = React.useTransition()
  const [dialog, setDialog] = React.useState<{
    type: OPTIONS_CRUD | null
    isOpen: boolean
    veterinarianId?: string
    veterinarian?: IVeterinarian
  }>({
    type: null,
    isOpen: false,
    veterinarianId: '',
    veterinarian: undefined,
  })

  const handleDialogClose = () => {
    setDialog((prevState) => ({
      ...prevState,
      isOpen: false,
      veterinarianId: '',
      veterinarian: undefined,
    }))
  }

  const handleDeleteVeterinarian = async (id?: string) => {
    if (!id) return false
    try {
      // delete veterinarian
      const res = await deleteVeterinarian({ id })
      if (res) {
        showToast(
          '¡Éxito! El veterinario ha sido eliminado satisfactoriamente.',
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
  const handleUpdateVeterinarian = async (veterinarian?: IVeterinarian) => {
    if (!veterinarian) return false
    const res = await updateVeterinarian({ input: veterinarian })
    if (res) {
      showToast(
        '¡Éxito! El veterinario ha sido actualizado satisfactoriamente.',
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
  const columns = React.useMemo<ColumnDef<IVeterinarian, unknown>[]>(
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
          <DataTableColumnHeader column={column} title='Nombre' />
        ),
        cell: ({ row }) => (
          <div className='min-w-[100px] max-w-[200px]'>
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
          <div className='min-w-[100px] max-w-[200px]'>
            {row.getValue('surname')}
          </div>
        ),
      },
      {
        accessorKey: 'email',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='Email' />
        ),
        cell: ({ row }) => {
          // const label = tasks.label.enumValues.find(
          //   (label) => label === row.original.label
          // )

          return (
            <div className='flex space-x-2'>
              {/* {label && <Badge variant="outline">{label}</Badge>} */}
              <span className='max-w-[500px] truncate font-medium'>
                {row.getValue('email')}
              </span>
            </div>
          )
        },
      },
      {
        accessorKey: 'specialty',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='Especialidad.' />
        ),
        cell: ({ row }) => {
          // const label = tasks.label.enumValues.find(
          //   (label) => label === row.original.label
          // )

          return (
            <div className='flex space-x-2'>
              {/* {label && <Badge variant="outline">{label}</Badge>} */}
              <span className='max-w-[500px] truncate font-medium'>
                {row.getValue('specialty')}
              </span>
            </div>
          )
        },
      },
      {
        accessorKey: 'phone',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='Telf.' />
        ),
        cell: ({ row }) => {
          // const label = tasks.label.enumValues.find(
          //   (label) => label === row.original.label
          // )

          return (
            <div className='flex space-x-2'>
              {/* {label && <Badge variant="outline">{label}</Badge>} */}
              <span className='max-w-[500px] truncate font-medium'>
                {row.getValue('phone')}
              </span>
            </div>
          )
        },
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
                  // Open de dialog box for editing the veterinarian
                  setDialog({
                    type: OPTIONS_CRUD.UPDATE,
                    veterinarian: row.original,
                    isOpen: true,
                  })
                },
              },
              {
                title: 'Eliminar',
                onHandle: () => {
                  // Open de dialog box for deleting the veterinarian
                  // setClinicIdToDelete(row.original.id!) // Asume que `row.id` es el id de la clínica
                  // setDialogOpen(true)
                  setDialog({
                    type: OPTIONS_CRUD.DELETE,
                    veterinarianId: row.original.id!,
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
            id: 'surname',
            title: 'por apellido',
          },
        ]}
      />
      {/* For delete veterinarian */}
      {dialog.type === OPTIONS_CRUD.DELETE && (
        <ConfirmDeleteDialog
          isOpen={dialog.isOpen}
          onClose={handleDialogClose}
          onConfirm={() => handleDeleteVeterinarian(dialog.veterinarianId)}
        />
      )}
      {/* For edit veterinarian */}
      {dialog.type === OPTIONS_CRUD.UPDATE && (
        <FormVeterinarian
          title='Editar veterinario:'
          isOpen={dialog.isOpen}
          onClose={handleDialogClose}
          onConfirm={handleUpdateVeterinarian}
          initialValues={dialog.veterinarian}
        />
      )}
    </>
  )
}
