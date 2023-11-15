'use client'

import * as React from 'react'
import { type ColumnDef } from '@tanstack/react-table'

import { Checkbox } from '@/components/ui/checkbox'

import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
import { MillionDataTable } from '@/components/data-table/million-data-table'
import { SpecieSchema, ISpecie } from '@/models/schemas'
import { DropdownMenuShell } from '../drop-down-menu-shell'
import { OPTIONS_CRUD, hourFormat } from '@/config/const'
import { ConfirmDeleteDialog, WithFormDialog } from '../config'
import { useForm } from 'react-hook-form'
import valibotResolver from '@/lib/valibotResolver'
import { FieldConfig } from '@/types'
import { deleteSpecie, updateSpecie } from '@/services/admin/species'
import { showToast } from '@/helpers/toast'
import { useRouter } from 'next/navigation'
import { getDateToString } from '@/lib/times'
import { FormSpecie } from './form'

interface SpeciesTableShellProps {
  data: ISpecie[]
  pageCount: number
}

export function SpeciesTableShell({ data, pageCount }: SpeciesTableShellProps) {
  const route = useRouter()
  const [isPending, startTransition] = React.useTransition()
  const [dialog, setDialog] = React.useState<{
    type: OPTIONS_CRUD | null
    isOpen: boolean
    specieId?: string
    specie?: ISpecie
  }>({
    type: null,
    isOpen: false,
    specieId: '',
    specie: undefined,
  })

  const handleDialogClose = () => {
    setDialog((prevState) => ({
      ...prevState,
      isOpen: false,
      specieId: '',
      specie: undefined,
    }))
  }
  const handleDeleteSpecie = async (id?: string) => {
    if (!id) return false
    try {
      // delete specie
      const res = await deleteSpecie({ id })
      if (res) {
        showToast(
          '¡Éxito! La especie ha sido eliminado satisfactoriamente.',
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
  const handleUpdateSpecie = async (specie?: ISpecie) => {
    if (!specie) return false
    const res = await updateSpecie({ input: specie })
    if (res) {
      showToast(
        '¡Éxito! La especie ha sido actualizado satisfactoriamente.',
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
  const columns = React.useMemo<ColumnDef<ISpecie, unknown>[]>(
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
          <DataTableColumnHeader column={column} title='Especie' />
        ),
        cell: ({ row }) => (
          <div className='w-[200px] max-w-[200px]'>{row.getValue('name')}</div>
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
                {getDateToString({ date: row.getValue('updatedAt') })}
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
                  // Open de dialog box for editing the specie
                  setDialog({
                    type: OPTIONS_CRUD.UPDATE,
                    specie: row.original,
                    isOpen: true,
                  })
                },
              },
              {
                title: 'Eliminar',
                onHandle: () => {
                  // Open de dialog box for deleting the specie
                  // setspecieIdToDelete(row.original.id!) // Asume que `row.id` es el id de la clínica
                  // setDialogOpen(true)
                  setDialog({
                    type: OPTIONS_CRUD.DELETE,
                    specieId: row.original.id!,
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
      {/* For delete specie */}
      {dialog.type === OPTIONS_CRUD.DELETE && (
        <ConfirmDeleteDialog
          isOpen={dialog.isOpen}
          onClose={handleDialogClose}
          onConfirm={() => handleDeleteSpecie(dialog.specieId)}
        />
      )}
      {/* For edit specie */}
      {dialog.type === OPTIONS_CRUD.UPDATE && (
        <FormSpecie
          title='Editar raza:'
          isOpen={dialog.isOpen}
          onClose={handleDialogClose}
          onConfirm={handleUpdateSpecie}
          initialValues={dialog.specie}
        />
      )}
    </>
  )
}
