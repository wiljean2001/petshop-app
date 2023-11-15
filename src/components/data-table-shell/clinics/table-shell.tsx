'use client'

import * as React from 'react'
import { type ColumnDef } from '@tanstack/react-table'

import { Checkbox } from '@/components/ui/checkbox'

import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
import { MillionDataTable } from '@/components/data-table/million-data-table'
import { IClinic, IClinicScheduleSchema, ISchedule } from '@/models/schemas'
import { DropdownMenuShell } from '../drop-down-menu-shell'
import { OPTIONS_CRUD } from '@/config/const'
import { ConfirmDeleteDialog } from '../config'
import { getDateToString } from '@/lib/times'
import { FormClinic } from './form'
import { deleteClinic, updateClinic } from '@/services/admin/clinics'
import { showToast } from '@/helpers/toast'
import { useRouter } from 'next/navigation'

interface ClinicsTableShellProps {
  data: IClinic[]
  pageCount: number
}

export function ClinicsTableShell({ data, pageCount }: ClinicsTableShellProps) {
  const route = useRouter()

  const [isPending, startTransition] = React.useTransition()
  const [dialog, setDialog] = React.useState<{
    type: OPTIONS_CRUD | null
    isOpen: boolean
    clinicId?: string
    clinic?: IClinic
  }>({
    type: null,
    isOpen: false,
    clinicId: '',
    clinic: undefined,
  })

  const handleDialogClose = () => {
    setDialog((prevState) => ({
      ...prevState,
      isOpen: false,
      clinicId: '',
      clinic: undefined,
    }))
  }

  const handleDeleteClinic = async (id?: string): Promise<boolean> => {
    if (!id) return false
    try {
      const res = await deleteClinic({ id })
      if (res) {
        showToast(
          '¡Éxito! La clinica ha sido elimina satisfactoriamente.',
          'success'
        )
        route.refresh()
        handleDialogClose()
        return true
      }
      showToast(
        'Advertencia: La clinica no se ha eliminado completamente. Por favor, completa todos los campos requeridos.',
        'warning'
      )
    } catch (error) {
      showToast(
        'Error: No se pudo realizar la acción. Por favor, inténtalo de nuevo.',
        'error'
      )
    }
    return false
    // delete clinic
  }
  const handleUpdateClinic = async (clinic?: IClinic): Promise<boolean> => {
    if (!clinic) return false
    const res = await updateClinic({ input: clinic })
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
          <div className='max-w-[200px]'>{row.getValue('name')}</div>
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
              <span className='min-w-[200px] max-w-[500px] truncate font-medium'>
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
        accessorKey: 'ClinicSchedule',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='Horarios' />
        ),
        cell: ({ row }) => {
          // const label = tasks.label.enumValues.find(
          //   (label) => label === row.original.label
          // )

          const ClinicSchedule = row.getValue(
            'ClinicSchedule'
          ) as IClinicScheduleSchema[]

          return (
            <div className='flex space-x-2'>
              {/* {label && <Badge variant="outline">{label}</Badge>} */}
              <div className='max-w-[500px] truncate font-medium'>
                {ClinicSchedule.length > 0 ? (
                  ClinicSchedule.map((schedule, index) => {
                    const { day_week, openingHour, closingHour } =
                      schedule.schedule
                    return (
                      <span key={index}>
                        {`${day_week} | ${openingHour} - ${closingHour}`}
                        <br />
                      </span>
                    )
                  })
                ) : (
                  <span>No hay horarios disponibles</span>
                )}
              </div>
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
            title: 'por nombre',
          },
          {
            id: 'location',
            title: 'por ubicación',
          },
        ]}
      />
      {/* For delete clinic */}
      {dialog.type === OPTIONS_CRUD.DELETE && (
        <ConfirmDeleteDialog
          isOpen={dialog.isOpen}
          onClose={() => handleDialogClose()}
          onConfirm={() => handleDeleteClinic(dialog.clinicId)}
        />
      )}
      {/* For edit clinic */}
      {dialog.type === OPTIONS_CRUD.UPDATE && (
        <FormClinic
          title='Editar local:'
          isOpen={dialog.isOpen}
          onClose={() => handleDialogClose()}
          onConfirm={handleUpdateClinic}
          initialValues={dialog.clinic}
        />
      )}
    </>
  )
}
