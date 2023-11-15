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
import { deletePet, updatePet } from '@/services/admin/pets'
import { showToast } from '@/helpers/toast'
import { getDateToString } from '@/lib/times'
import { FormPet } from './form'
import { useRouter } from 'next/navigation'

interface PetsTableShellProps {
  data: IPet[]
  pageCount: number
}

export function PetsTableShell({ data, pageCount }: PetsTableShellProps) {
  const route = useRouter()

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
  const handleDeletePet = async (id?: string) => {
    if (!id) return false
    try {
      // delete pet
      const res = await deletePet({ id })
      if (res) {
        showToast(
          '¡Éxito! La mascota ha sido eliminado satisfactoriamente.',
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
  const handleUpdatePet = async (pet?: IPet) => {
    if (!pet) return false
    const res = await updatePet({ input: pet })
    if (res) {
      showToast(
        '¡Éxito! La mascota ha sido actualizado satisfactoriamente.',
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
          <div className='min-w-[150px] max-w-[200px]'>
            {getDateToString({ date: row.getValue('birthdate') })}
          </div>
        ),
      },
      {
        accessorKey: 'color',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='Color' />
        ),
        cell: ({ row }) => (
          <div className='max-w-[200px]'>{row.getValue('color')}</div>
        ),
      },
      {
        accessorKey: 'medicalNotes',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='Notas:' />
        ),
        cell: ({ row }) => (
          <div className='max-w-[200px]'>{row.getValue('medicalNotes')}</div>
        ),
      },
      {
        accessorKey: 'derivedFrom',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='Derivado:' />
        ),
        cell: ({ row }) => (
          <div className='max-w-[200px]'>{row.getValue('derivedFrom')}</div>
        ),
      },
      {
        accessorKey: 'owner',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='Dueño' />
        ),
        cell: ({ row }) => (
          <div className='min-w-[200px] max-w-[200px]'>
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
          <div className='min-w-[100px] max-w-[200px]'>
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
                  // setPetIdToDelete(row.original.id!) // Asume que `row.id` es el id de la clínica
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
          onConfirm={() => handleDeletePet(dialog.petId)}
        />
      )}
      {/* For edit pet */}
      {dialog.type === OPTIONS_CRUD.UPDATE && (
        <FormPet
          title='Editar mascota:'
          isOpen={dialog.isOpen}
          onClose={() => handleDialogClose()}
          onConfirm={handleUpdatePet}
          initialValues={dialog.pet}
        />
      )}
    </>
  )
}
