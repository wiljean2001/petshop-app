'use client'

import * as React from 'react'
import { type ColumnDef } from '@tanstack/react-table'

import { Checkbox } from '@/components/ui/checkbox'

import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
import { MillionDataTable } from '@/components/data-table/million-data-table'
import { ClinicSchema, IClinic } from '@/models/schemas'
import { DropdownMenuShell } from '../drop-down-menu-shell'
import { OPTIONS_CRUD } from '@/config/const'
import { ConfirmDeleteDialog, WithFormDialog } from '../config'
import { useForm } from 'react-hook-form'
import valibotResolver from '@/lib/valibotResolver'
import { CustomOptionInput } from '@/components/forms/Form'

interface ClinicsTableShellProps {
  data: IClinic[]
  pageCount: number
}

export function ClinicsTableShell({ data, pageCount }: ClinicsTableShellProps) {
  const [isPending, startTransition] = React.useTransition()
  const [dialog, setDialog] = React.useState<{
    type: OPTIONS_CRUD | null
    isOpen: boolean
    clinicId?: string
    clinic?: IClinic | null
  }>({
    type: null,
    isOpen: false,
    clinicId: '',
    clinic: null,
  })

  const form = useForm<IClinic>({
    resolver: valibotResolver(ClinicSchema),
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
      clinicId: '',
      clinic: null,
    }))
  }
  const handleDialogConfirm = () => {
    if (dialog.type === OPTIONS_CRUD.DELETE) deleteClinic(dialog.clinicId)
    if (dialog.type === OPTIONS_CRUD.UPDATE) updateClinic(dialog.clinic)
    handleDialogClose()
  }

  const deleteClinic = (id?: string | null) => {
    if (id) {
      console.log(
        '🚀 ~ file: clinics-table-shell.tsx:43 ~ deleteClinic ~ id:',
        id
      )
      // delete clinic
    }
  }
  const updateClinic = (clinic?: IClinic | null) => {
    if (clinic) {
      // delete clinic
    }
  }

  // Memoize the columns so they don't re-render on every render
  const columns = React.useMemo<ColumnDef<IClinic, unknown>[]>(
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
          <div className='w-[200px] max-w-[200px]'>{row.getValue('name')}</div>
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: 'location',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='Ubicación' />
        ),
        cell: ({ row }) => {
          // const label = tasks.label.enumValues.find(
          //   (label) => label === row.original.label
          // )

          return (
            <div className='flex space-x-2'>
              {/* {label && <Badge variant="outline">{label}</Badge>} */}
              <span className='max-w-[500px] truncate font-medium'>
                {row.getValue('location')}
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
                {new Date(row.getValue('createdAt')).toDateString()}
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
                {new Date(row.getValue('updatedAt')).toDateString()}
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
                  // Open de dialog box for editing the clinic
                  setDialog({
                    type: OPTIONS_CRUD.UPDATE,
                    clinic: row.original,
                    isOpen: true,
                  })
                },
              },
              {
                title: 'Eliminar',
                onHandle: () => {
                  // Open de dialog box for deleting the clinic
                  // setClinicIdToDelete(row.original.id!) // Asume que `row.id` es el id de la clínica
                  // setDialogOpen(true)
                  setDialog({
                    type: OPTIONS_CRUD.DELETE,
                    clinicId: row.original.id!,
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
            title: 'Ubicación',
          },
        ]}
      />
      {/* For delete clinic */}
      {dialog.type === OPTIONS_CRUD.DELETE && (
        <ConfirmDeleteDialog
          isOpen={dialog.isOpen}
          onClose={() => handleDialogClose()}
          onConfirm={() => handleDialogConfirm()}
        />
      )}
      {/* For edit clinic */}
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
