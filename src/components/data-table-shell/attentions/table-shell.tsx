'use client'

import * as React from 'react'
import { type ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
import { MillionDataTable } from '@/components/data-table/million-data-table'
import { Attendance, ISpecie } from '@/models/schemas.d'
import { DropdownMenuShell } from '../drop-down-menu-shell'
import { OPTIONS_CRUD } from '@/config/const'
import { ConfirmDeleteDialog } from '../config'
// import { deleteBreed, updateBreed } from '@/services/admin/attentions'
import { showToast } from '@/helpers/toast'
import { getDateToString } from '@/lib/times'
import { FormBreed } from './form'
import { useRouter } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { Appointment } from '@/models/schemas.d'

interface AttentionsTableShellProps {
  data: Attendance[]
  pageCount: number
}

export default function AttentionsTableShell({
  data,
  pageCount,
}: AttentionsTableShellProps) {
  // const route = useRouter()
  const [isPending, startTransition] = React.useTransition()

  // Memoize the columns so they don't re-render on every render
  const columns = React.useMemo<ColumnDef<Attendance, unknown>[]>(
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
        accessorKey: 'date',
        header: ({ column }) => {
          return (
            <DataTableColumnHeader column={column} title='Fecha de atención' />
          )
        },
        cell: ({ row }) => {
          const date = getDateToString({ date: row.getValue('date') })
          return (
            <div className='min-w-[200px] max-w-[200px]'>
              {!date.error && date.formattedDate}
            </div>
          )
        },
      },
      {
        accessorKey: 'appointment',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='Fecha de cita' />
        ),
        cell: ({ row }) => {
          const appointment = row.getValue('appointment') as Appointment
          const date = getDateToString({ date: appointment.scheduledDateTime })
          return (
            <div className='min-w-[200px] max-w-[200px]'>
              {!date.error && date.formattedDate}
            </div>
          )
        },
        enableSorting: false,
      },
      {
        accessorKey: 'appointment',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='Estado' />
        ),
        cell: ({ row }) => {
          const appointment = row.getValue('appointment') as Appointment

          return (
            <div className='min-w-[200px] max-w-[200px]'>
              {appointment.status}
            </div>
          )
        },
        enableSorting: false,
      },
      {
        accessorKey: 'appointment',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='Mascota' />
        ),
        cell: ({ row }) => {
          const appointment = row.getValue('appointment') as Appointment

          return (
            <div className='min-w-[300px] max-w-[200px]'>
              <Badge className='mr-2'>{appointment.pet.breed.name}</Badge>
              <span>{appointment.pet.name}</span>
            </div>
          )
        },
        enableSorting: false,
      },
      {
        accessorKey: 'appointment',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='Propietario' />
        ),
        cell: ({ row }) => {
          const appointment = row.getValue('appointment') as Appointment

          return (
            <div className='min-w-[300px] max-w-[200px]'>
              <span>
                {appointment.pet.owner.name} {appointment.pet.owner.surname}
              </span>
            </div>
          )
        },
        enableSorting: false,
      },
      {
        accessorKey: 'appointment',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='Veterinario' />
        ),
        cell: ({ row }) => {
          const appointment = row.getValue('appointment') as Appointment

          return (
            <div className='min-w-[300px] max-w-[200px]'>
              <Badge>{appointment.veterinarian.specialty}</Badge>
              <span>
                {appointment.veterinarian.name}{' '}
                {appointment.veterinarian.surname}
              </span>
            </div>
          )
        },
        enableSorting: false,
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
          const date = getDateToString({ date: row.getValue('createdAt') })
          return (
            <div className='flex space-x-2'>
              {/* {label && <Badge variant="outline">{label}</Badge>} */}
              <span className='max-w-[500px] truncate font-medium'>
                {!date.error && date.formattedDate}
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
          const date = getDateToString({ date: row.getValue('updatedAt') })
          return (
            <div className='flex space-x-2'>
              {/* {label && <Badge variant="outline">{label}</Badge>} */}
              <span className='max-w-[500px] truncate font-medium'>
                {!date.error && date.formattedDate}
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
            id: 'date',
            title: 'fecha',
          },
        ]}
      />
    </>
  )
}
