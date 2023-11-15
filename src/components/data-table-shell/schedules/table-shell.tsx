'use client'

import * as React from 'react'
import { type ColumnDef } from '@tanstack/react-table'

import { Checkbox } from '@/components/ui/checkbox'

import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
import { MillionDataTable } from '@/components/data-table/million-data-table'
import { ISchedule } from '@/models/schemas'
import { DropdownMenuShell } from '../drop-down-menu-shell'
import { OPTIONS_CRUD } from '@/config/const'
import { ConfirmDeleteDialog } from '../config'
import { deleteSchedule, updateSchedule } from '@/services/admin/schedules'
import { showToast } from '@/helpers/toast'
import { useRouter } from 'next/navigation'
import { getDateToString } from '@/lib/times'
import { FormSchedule } from './form'

interface ScheduleTableShellProps {
  data: ISchedule[]
  pageCount: number
}

export function ScheduleTableShell({
  data,
  pageCount,
}: ScheduleTableShellProps) {
  const route = useRouter()
  const [isPending, startTransition] = React.useTransition()
  const [dialog, setDialog] = React.useState<{
    type: OPTIONS_CRUD | null
    isOpen: boolean
    scheduleId?: string
    schedule?: ISchedule
  }>({
    type: null,
    isOpen: false,
    scheduleId: '',
    schedule: undefined,
  })

  const handleDialogClose = () => {
    setDialog((prevState) => ({
      ...prevState,
      isOpen: false,
      petId: '',
      schedule: undefined,
    }))
  }

  const handleDeleteSchedule = async (id?: string) => {
    if (!id) return false
    try {
      // delete schedule
      const res = await deleteSchedule({ id })
      if (res) {
        showToast(
          '¡Éxito! El horario ha sido eliminado satisfactoriamente.',
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
  const handleUpdateSchedule = async (schedule?: ISchedule) => {
    if (!schedule) return false
    const res = await updateSchedule({ input: schedule })
    if (res) {
      showToast(
        '¡Éxito! El horario ha sido actualizado satisfactoriamente.',
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
          <div className='min-w-[200px] max-w-[200px]'>
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
                  // Open de dialog box for editing the schedule
                  setDialog({
                    type: OPTIONS_CRUD.UPDATE,
                    schedule: row.original,
                    isOpen: true,
                  })
                },
              },
              {
                title: 'Eliminar',
                onHandle: () => {
                  // Open de dialog box for deleting the schedule
                  // setscheduleIdToDelete(row.original.id!) // Asume que `row.id` es el id de la clínica
                  // setDialogOpen(true)
                  setDialog({
                    type: OPTIONS_CRUD.DELETE,
                    scheduleId: row.original.id!,
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
      {/* For delete schedule */}
      {dialog.type === OPTIONS_CRUD.DELETE && (
        <ConfirmDeleteDialog
          isOpen={dialog.isOpen}
          onClose={handleDialogClose}
          onConfirm={() => handleDeleteSchedule(dialog.scheduleId)}
        />
      )}
      {/* For edit schedule */}
      {dialog.type === OPTIONS_CRUD.UPDATE && (
        <FormSchedule
          title='Editar horario:'
          isOpen={dialog.isOpen}
          onClose={handleDialogClose}
          onConfirm={handleUpdateSchedule}
          initialValues={dialog.schedule}
        />
      )}
    </>
  )
}
