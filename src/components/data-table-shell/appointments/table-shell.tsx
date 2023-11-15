'use client'

import * as React from 'react'
import { type ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
import { MillionDataTable } from '@/components/data-table/million-data-table'
import { IBreed, ISpecie } from '@/models/schemas'
import { DropdownMenuShell } from '../drop-down-menu-shell'
import { OPTIONS_CRUD } from '@/config/const'
import { ConfirmDeleteDialog } from '../config'
import { deleteBreed, updateBreed } from '@/services/admin/breeds'
import { showToast } from '@/helpers/toast'
import { getDateToString } from '@/lib/times'
import { FormBreed } from './form'
import { useRouter } from 'next/navigation'

interface BreedsTableShellProps {
  data: IBreed[]
  pageCount: number
}

export function BreedsTableShell({ data, pageCount }: BreedsTableShellProps) {
  const route = useRouter()
  const [isPending, startTransition] = React.useTransition()
  const [dialog, setDialog] = React.useState<{
    type: OPTIONS_CRUD | null
    isOpen: boolean
    breedId?: string
    breed?: IBreed
  }>({
    type: null,
    isOpen: false,
    breedId: '',
    breed: undefined,
  })

  const handleDialogClose = () => {
    setDialog((prevState) => ({
      ...prevState,
      isOpen: false,
      breedId: '',
      breed: undefined,
    }))
  }

  const handleDeleteBreed = async (id?: string | null): Promise<boolean> => {
    if (!id) return false

    try {
      const res = await deleteBreed({ id })
      if (res) {
        showToast(
          '¡Éxito! La raza ha sido eliminado satisfactoriamente.',
          'success'
        )
        handleDialogClose()
        route.refresh()
        return true
      }
      showToast(
        'Advertencia: La raza no se ha eliminado completamente. Por favor, completa todos los campos requeridos.',
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

  const handleUpdateBreed = async (breed?: IBreed): Promise<boolean> => {
    if (!breed) return false

    const res = await updateBreed({ input: breed })
    if (res) {
      showToast(
        '¡Éxito! La raza ha sido actualizada satisfactoriamente.',
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
  const columns = React.useMemo<ColumnDef<IBreed, unknown>[]>(
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
        header: ({ column }) => {
          return <DataTableColumnHeader column={column} title='Raza' />
        },
        cell: ({ row }) => (
          <div className='min-w-[200px] max-w-[200px]'>
            {row.getValue('name')}
          </div>
        ),
      },
      {
        accessorKey: 'specie',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='Especie' />
        ),
        cell: ({ row }) => (
          <div className='min-w-[200px] max-w-[200px]'>
            {(row.getValue('specie') as ISpecie).name}
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
                  // Open de dialog box for editing the breed
                  setDialog({
                    type: OPTIONS_CRUD.UPDATE,
                    breed: row.original,
                    isOpen: true,
                  })
                },
              },
              {
                title: 'Eliminar',
                onHandle: () => {
                  // Open de dialog box for deleting the breed
                  // setbreedIdToDelete(row.original.id!) // Asume que `row.id` es el id de la clínica
                  // setDialogOpen(true)
                  setDialog({
                    type: OPTIONS_CRUD.DELETE,
                    breedId: row.original.id!,
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
      {/* For delete breed */}
      {dialog.type === OPTIONS_CRUD.DELETE && (
        <ConfirmDeleteDialog
          isOpen={dialog.isOpen}
          onClose={() => handleDialogClose()}
          onConfirm={() => handleDeleteBreed(dialog.breedId)}
        />
      )}
      {/* For edit breed */}
      {dialog.type === OPTIONS_CRUD.UPDATE && (
        <FormBreed
          title='Editar raza:'
          isOpen={dialog.isOpen}
          onClose={() => handleDialogClose()}
          onConfirm={handleUpdateBreed}
          initialValues={dialog.breed}
        />
      )}
    </>
  )
}
