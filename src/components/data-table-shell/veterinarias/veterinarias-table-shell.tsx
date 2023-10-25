'use client'

import * as React from 'react'
import { type ColumnDef } from '@tanstack/react-table'

import { Checkbox } from '@/components/ui/checkbox'

import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
import { MillionDataTable } from '@/components/data-table/million-data-table'
import { VeterinarianSchema, IVeterinarian } from '@/models/schemas'
import { DropdownMenuShell } from '../drop-down-menu-shell'
import { OPTIONS_CRUD } from '@/config/const'
import { ConfirmDeleteDialog, WithFormDialog } from '../config'
import { useForm } from 'react-hook-form'
import valibotResolver from '@/lib/valibotResolver'
import { CustomOptionInput } from '@/components/forms/Form'
import { getDateToString } from '@/lib/times'

interface ClinicsTableShellProps {
  data: IVeterinarian[]
  pageCount: number
}

export function VeterinariansTableShell({
  data,
  pageCount,
}: ClinicsTableShellProps) {
  const [isPending, startTransition] = React.useTransition()
  const [dialog, setDialog] = React.useState<{
    type: OPTIONS_CRUD | null
    isOpen: boolean
    veterinarianId?: string
    veterinarian?: IVeterinarian | null
  }>({
    type: null,
    isOpen: false,
    veterinarianId: '',
    veterinarian: null,
  })

  const form = useForm<IVeterinarian>({
    resolver: valibotResolver(VeterinarianSchema),
  })

  const inputs: CustomOptionInput[] = React.useMemo(() => {
    return [
      {
        type: 'text',
        name: 'name',
        autoComplete: 'name_clinic',
        placeHolder: 'Nombre del local',
        className: 'mb-1 col-span-3',
      },
      {
        type: 'tel',
        name: 'phone',
        autoComplete: 'phone_number',
        placeHolder: 'Teléfono',
        className: 'mb-1 col-span-1',
      },
      {
        type: 'text',
        name: 'location',
        autoComplete: 'location',
        placeHolder: 'Ubicación',
        className: 'mb-2 col-span-4',
      },
    ]
  }, [])
  const handleDialogClose = () => {
    setDialog((prevState) => ({
      ...prevState,
      isOpen: false,
      veterinarianId: '',
      veterinarian: null,
    }))
  }
  const handleDialogConfirm = () => {
    if (dialog.type === OPTIONS_CRUD.DELETE)
      deleteVeterinarian(dialog.veterinarianId)
    if (dialog.type === OPTIONS_CRUD.UPDATE)
      updateVeterinarian(dialog.veterinarian)
    handleDialogClose()
  }

  const deleteVeterinarian = (id?: string | null) => {
    if (id) {
      console.log(
        '🚀 ~ file: clinics-table-shell.tsx:43 ~ deleteVeterinarian ~ id:',
        id
      )
      // delete veterinarian
    }
  }
  const updateVeterinarian = (veterinarian?: IVeterinarian | null) => {
    if (veterinarian) {
      // delete veterinarian
    }
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
          <div className='w-[100px] max-w-[200px]'>{row.getValue('name')}</div>
        ),
      },
      {
        accessorKey: 'surname',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='Apellidos' />
        ),
        cell: ({ row }) => (
          <div className='w-[100px] max-w-[200px]'>
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
            title: 'apellido',
          },
        ]}
      />
      {/* For delete veterinarian */}
      {dialog.type === OPTIONS_CRUD.DELETE && (
        <ConfirmDeleteDialog
          isOpen={dialog.isOpen}
          onClose={() => handleDialogClose()}
          onConfirm={() => handleDialogConfirm()}
        />
      )}
      {/* For edit veterinarian */}
      {dialog.type === OPTIONS_CRUD.UPDATE && (
        <WithFormDialog
          title='Editar local:'
          form={{ form, inputs }}
          isOpen={dialog.isOpen}
          onClose={() => handleDialogClose()}
          onConfirm={() => handleDialogConfirm()}
        />
      )}
    </>
  )
}
