'use client'

import * as React from 'react'
import { type ColumnDef } from '@tanstack/react-table'

import { Checkbox } from '@/components/ui/checkbox'

import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
import { MillionDataTable } from '@/components/data-table/million-data-table'
import { OwnerSchema, IOwner } from '@/models/schemas'
import { DropdownMenuShell } from '../drop-down-menu-shell'
import { OPTIONS_CRUD, hourFormat } from '@/config/const'
import { ConfirmDeleteDialog, WithFormDialog } from '../config'
import { useForm } from 'react-hook-form'
import valibotResolver from '@/lib/valibotResolver'
import { FieldConfig } from '@/types'
import { deleteOwner } from '@/services/admin/owners'
import { showToast } from '@/helpers/toast'
import { useRouter } from 'next/navigation'
import { getDateToString } from '@/lib/times'

interface OwnersTableShellProps {
  data: IOwner[]
  pageCount: number
}

export function OwnersTableShell({ data, pageCount }: OwnersTableShellProps) {
  const router = useRouter()
  const [isPending, startTransition] = React.useTransition()
  const [dialog, setDialog] = React.useState<{
    type: OPTIONS_CRUD | null
    isOpen: boolean
    clinicId?: string
    clinic?: IOwner | null
  }>({
    type: null,
    isOpen: false,
    clinicId: '',
    clinic: null,
  })

  const form = useForm<IOwner>({
    resolver: valibotResolver(OwnerSchema),
  })
  const inputs = React.useMemo((): FieldConfig[] => {
    return [
      {
        type: 'text',
        name: 'name',
        label: 'Nombres:',
        placeholder: 'Nombres',
      },
      {
        type: 'text',
        name: 'surname',
        label: 'Apellidos:',
        placeholder: 'Apellidos',
      },
      {
        type: 'text',
        name: 'city',
        label: 'Ciudad:',
        placeholder: 'Ciudad',
      },
      {
        type: 'text',
        name: 'address',
        label: 'Dirección:',
        placeholder: 'Dirección',
      },
      {
        type: 'text',
        name: 'phone',
        label: 'Número de Teléfono:',
        placeholder: 'Teléfono',
      },
      {
        type: 'text',
        name: 'email',
        label: 'Correo electrónico:',
        placeholder: 'Correo electrónico',
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

  const deleteClinic = async (id?: string | null) => {
    try {
      if (!id) return
      // delete clinic
      const res = await deleteOwner({ id })
      if (res) {
        showToast('Horario eliminado con éxito', 'success')
        return router.refresh()
      }
    } catch (error) {}
    return showToast('Error: raza no eliminada', 'error')
  }
  const updateClinic = (clinic?: IOwner | null) => {
    if (clinic) {
      // delete clinic
    }
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
          <div className='w-[200px] max-w-[200px]'>{row.getValue('name')}</div>
        ),
      },
      {
        accessorKey: 'surname',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='Apellidos' />
        ),
        cell: ({ row }) => (
          <div className='w-[200px] max-w-[200px]'>
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
          <div className='w-[200px] max-w-[200px]'>{row.getValue('email')}</div>
        ),
      },
      {
        accessorKey: 'phone',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='Telf.' />
        ),
        cell: ({ row }) => (
          <div className='w-[200px] max-w-[200px]'>{row.getValue('phone')}</div>
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
                  // Open de dialog box for editing the clinic
                  form.setValue('name', row.getValue('name'))
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
            title: 'raza',
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
          title='Editar raza:'
          form={{ form, inputs }}
          isOpen={dialog.isOpen}
          onClose={() => handleDialogClose()}
          onConfirm={() => handleDialogConfirm()}
        />
      )}
    </>
  )
}
