'use client'

import * as React from 'react'
import { type ColumnDef } from '@tanstack/react-table'

import { Checkbox } from '@/components/ui/checkbox'

import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
import { MillionDataTable } from '@/components/data-table/million-data-table'
import { ScheduleSchema, ISchedule } from '@/models/schemas'
import { DropdownMenuShell } from '../drop-down-menu-shell'
import { OPTIONS_CRUD, hourFormat } from '@/config/const'
import { ConfirmDeleteDialog, WithFormDialog } from '../config'
import { useForm } from 'react-hook-form'
import valibotResolver from '@/lib/valibotResolver'
import { FieldConfig } from '@/types'
import { deleteSchedule } from '@/services/admin/schedules'
import { showToast } from '@/helpers/toast'
import { useRouter } from 'next/navigation'
import { getDateToString } from '@/lib/times'

interface ScheduleTableShellProps {
  data: ISchedule[]
  pageCount: number
}

export function ScheduleTableShell({
  data,
  pageCount,
}: ScheduleTableShellProps) {
  const router = useRouter()
  const [isPending, startTransition] = React.useTransition()
  const [dialog, setDialog] = React.useState<{
    type: OPTIONS_CRUD | null
    isOpen: boolean
    clinicId?: string
    clinic?: ISchedule | null
  }>({
    type: null,
    isOpen: false,
    clinicId: '',
    clinic: null,
  })

  const form = useForm<ISchedule>({
    resolver: valibotResolver(ScheduleSchema),
  })

  const inputs = React.useMemo((): FieldConfig[] => {
    return [
      {
        type: 'text',
        name: 'day_week',
        // autoComplete: 'name_schedule',
        label: 'Días:',
        placeholder: 'Días',
        // className: 'mb-1 col-span-3',
      },
      {
        type: 'time',
        name: 'openingHour',
        placeholder: 'Abre',
        label: 'Abierto:',
        description: '',
        // withTime: true,

        // autoComplete: 'phone_number',
        // className: 'mb-1 col-span-1',
      },
      {
        type: 'time',
        name: 'closingHour',
        label: 'Cerrado:',
        description: '',
        placeholder: 'Cierra',
        // autoComplete: 'phone_number',
        // className: 'mb-1 col-span-1',
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
      const res = await deleteSchedule({ id })
      if (res) {
        showToast('Horario eliminado con éxito', 'success')
        return router.refresh()
      }
    } catch (error) {}
    return showToast('Error: horario no eliminada', 'error')
  }
  const updateClinic = (clinic?: ISchedule | null) => {
    if (clinic) {
      // delete clinic
    }
  }

  // Memoize the columns so they don't re-render on every render
  const columns = React.useMemo<ColumnDef<ISchedule, unknown>[]>(
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
        accessorKey: 'day_week',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='Días' />
        ),
        cell: ({ row }) => (
          <div className='w-[200px] max-w-[200px]'>
            {row.getValue('day_week')}
          </div>
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: 'openingHour',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='Hora inicio' />
        ),
        cell: ({ row }) => {
          // const label = tasks.label.enumValues.find(
          //   (label) => label === row.original.label
          // )

          return (
            <div className='flex space-x-2'>
              {/* {label && <Badge variant="outline">{label}</Badge>} */}
              <span className='max-w-[500px] truncate font-medium'>
                {row.getValue('openingHour')}
                {/* {getDateToString({
                  date: row.getValue('openingHour'),
                  dateFormate: hourFormat,
                })} */}
              </span>
            </div>
          )
        },
      },
      {
        accessorKey: 'closingHour',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='Hora fin' />
        ),
        cell: ({ row }) => {
          // const label = tasks.label.enumValues.find(
          //   (label) => label === row.original.label
          // )

          return (
            <div className='flex space-x-2'>
              {/* {label && <Badge variant="outline">{label}</Badge>} */}
              <span className='max-w-[500px] truncate font-medium'>
                {row.getValue('closingHour')}
                {/* {getDateToString({
                  date: row.getValue('closingHour'),
                  dateFormate: hourFormat,
                })} */}
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
                  // Open de dialog box for editing the clinic
                  form.setValue('day_week', row.getValue('day_week'))
                  form.setValue('openingHour', row.getValue('openingHour'))
                  form.setValue('closingHour', row.getValue('closingHour'))
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
            id: 'day_week',
            title: 'día',
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
          title='Editar horario:'
          form={{ form, inputs }}
          isOpen={dialog.isOpen}
          onClose={() => handleDialogClose()}
          onConfirm={() => handleDialogConfirm()}
        />
      )}
    </>
  )
}
