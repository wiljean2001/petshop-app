'use client'

import * as React from 'react'
import { type ColumnDef } from '@tanstack/react-table'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
import { MillionDataTable } from '@/components/data-table/million-data-table'
import { Icons } from '@/components/icons'
import { IUserRestrict } from '@/models/user'
import { getDateToString } from '@/lib/times'

// const labels: {
//   value: User['roleId']
//   label: string
// }[] = [
//   {
//     value: 'bug',
//     label: 'Bug',
//   },
//   {
//     value: 'feature',
//     label: 'Feature',
//   },
//   {
//     value: 'documentation',
//     label: 'Documentation',
//   },
// ]

interface UsersTableShellProps {
  data: IUserRestrict[]
  pageCount: number
}

export function UsersTableShell({ data, pageCount }: UsersTableShellProps) {
  const [isPending, startTransition] = React.useTransition()

  // Memoize the columns so they don't re-render on every render
  const columns = React.useMemo<ColumnDef<IUserRestrict, unknown>[]>(
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
          <div className='w-[100px]'>{row.getValue('name')}</div>
        ),
        enableSorting: false,
        enableHiding: false,
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
        accessorKey: 'role',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='Rol' />
        ),
        cell: ({ row }) => {
          // const label = tasks.label.enumValues.find(
          //   (label) => label === row.original.label
          // )

          return (
            <div className='flex space-x-2'>
              {/* {label && <Badge variant="outline">{label}</Badge>} */}
              <span className='max-w-[500px] truncate font-medium'>
                {/* TODO: get role */}
                {(row.getValue('role') as { name: string }).name}
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
          <DataTableColumnHeader column={column} title='F. actualización' />
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                aria-label='Open menu'
                variant='ghost'
                className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
              >
                <Icons.grid className='h-4 w-4' aria-hidden='true' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-[160px]'>
              <DropdownMenuItem>Editar</DropdownMenuItem>
              <DropdownMenuItem>Marcar y copiar</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Etiquetas</DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuRadioGroup
                    // value={row.original.}
                    onValueChange={(value) => {
                      startTransition(async () => {
                        // await updateTaskLabelAction({
                        //   id: row.original.id,
                        //   label: value as Task["label"],
                        // })
                      })
                    }}
                  >
                    {/* {labels.map((label) => (
                      <DropdownMenuRadioItem
                        key={label.value}
                        value={label.value}
                        disabled={isPending}
                      >
                        {label.label}
                      </DropdownMenuRadioItem>
                    ))} */}
                  </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Delete
                <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    [isPending]
  )

  return (
    <MillionDataTable
      columns={columns}
      data={data}
      pageCount={pageCount}
      filterableColumns={
        [
          // {
          //   id: 'name',
          //   title: 'Nombre',
          //   options: [],
          // tasks.status.enumValues.map((status) => ({
          //   label: status[0]!.toUpperCase() + status.slice(1),
          //   value: status,
          // })),
          // },
          // {
          //   id: 'email',
          //   title: 'Email',
          //   options: [],
          // tasks.priority.enumValues.map((priority) => ({
          //   label: priority[0]!.toUpperCase() + priority.slice(1),
          //   value: priority,
          // })),
          // },
        ]
      }
      searchableColumns={[
        {
          id: 'name',
          title: 'Nombre',
        },
        {
          id: 'email',
          title: 'Email',
        },
      ]}
    />
  )
}
