'use client'

import * as React from 'react'
import { type ColumnDef } from '@tanstack/react-table'

import { Checkbox } from '@/components/ui/checkbox'

import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
import { MillionDataTable } from '@/components/data-table/million-data-table'
import { IService, IServiceDetail } from '@/models/schemas.d'
import { DropdownMenuShell } from '../drop-down-menu-shell'
import {
  OPTIONS_CRUD,
  SERVICESTATUSTRANSLATIONS,
  ServiceStatusKey,
} from '@/config/const'
import { ConfirmDeleteDialog } from '../config'
import { deleteService, updateService } from '@/services/admin/services'
import { showToast } from '@/helpers/toast'
import { useRouter } from 'next/navigation'
import { getDateToString } from '@/lib/times'
import { FormService } from './form'
import { Badge } from '@/components/ui/badge'

interface ServicesTableShellProps {
  data: IService[]
  pageCount: number
}

export default function ServicesTableShell({
  data,
  pageCount,
}: ServicesTableShellProps) {
  const route = useRouter()
  const [isPending, startTransition] = React.useTransition()
  const [dialog, setDialog] = React.useState<{
    type: OPTIONS_CRUD | null
    isOpen: boolean
    serviceId?: string
    service?: IService
  }>({
    type: null,
    isOpen: false,
    serviceId: '',
    service: undefined,
  })

  const handleDialogClose = () => {
    setDialog((prevState) => ({
      ...prevState,
      isOpen: false,
      serviceId: '',
      service: undefined,
    }))
  }

  const handleDeleteService = async (id?: string) => {
    if (!id) return false
    try {
      // delete service
      const res = await deleteService({ id })
      if (res) {
        showToast(
          '¡Éxito! El servicio ha sido eliminado satisfactoriamente.',
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
  const handleUpdateService = async (service?: IService) => {
    if (!service) return false
    const res = await updateService({ input: service })
    if (res) {
      showToast(
        '¡Éxito! El servicio ha sido actualizado satisfactoriamente.',
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
  const columns = React.useMemo<ColumnDef<IService, unknown>[]>(
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
          <div className='min-w-[100px] max-w-[200px]'>
            {row.getValue('name')}
          </div>
        ),
      },
      {
        accessorKey: 'description',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='Descripción' />
        ),
        cell: ({ row }) => (
          <div className='min-w-[300px] max-w-[200px]'>
            {row.getValue('description')}
          </div>
        ),
      },
      {
        accessorKey: 'cost',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='Precio est.' />
        ),
        cell: ({ row }) => (
          <div className='max-w-[200px]'>{row.getValue('cost')}</div>
        ),
      },
      {
        accessorKey: 'duration',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='Duración' />
        ),
        cell: ({ row }) => (
          <div className=' max-w-[200px]'>{row.getValue('duration')}</div>
        ),
      },
      {
        accessorKey: 'state',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='Estado' />
        ),
        cell: ({ row }) => (
          <div className='max-w-[200px]'>
            {
              SERVICESTATUSTRANSLATIONS[
                row.getValue('state') as ServiceStatusKey
              ]
            }
          </div>
        ),
      },
      // Services details, not available
      // {
      //   accessorKey: 'ServiceDetails',
      //   enableSorting: false,
      //   header: ({ column }) => (
      //     <DataTableColumnHeader column={column} title='Detalles' />
      //   ),
      //   cell: ({ row }) => {
      //     const details = row.getValue('ServiceDetails') as IServiceDetail[]

      //     // Crear un objeto para agrupar los detalles por tipo
      //     const groupedDetails = details.reduce((acc, detail) => {
      //       // Inicializa el grupo si aún no existe
      //       if (!acc[detail.detailType]) {
      //         acc[detail.detailType] = []
      //       }
      //       // Agrega el detalle al grupo correspondiente
      //       acc[detail.detailType].push(detail)
      //       return acc
      //     }, {} as Record<string, IServiceDetail[]>)

      //     return (
      //       <div className='min-w-[300px] max-w-[200px]'>
      //         {Object.entries(groupedDetails).map(([type, typeDetails]) => (
      //           <div key={type}>
      //             {/* Muestra el tipo como un Badge */}
      //             <Badge variant='outline'>{type}</Badge>

      //             {/* Lista de detalles para este tipo */}
      //             {typeDetails.map((detail, index) => (
      //               <div key={index} className=''>
      //                 {detail.value}
      //               </div>
      //             ))}
      //           </div>
      //         ))}
      //       </div>
      //     )
      //   },
      // },
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
                title: 'Editar',
                onHandle: () => {
                  // Open de dialog box for editing the service
                  setDialog({
                    type: OPTIONS_CRUD.UPDATE,
                    service: row.original,
                    isOpen: true,
                  })
                },
              },
              {
                title: 'Eliminar',
                onHandle: () => {
                  // Open de dialog box for deleting the service
                  // setserviceIdToDelete(row.original.id!) // Asume que `row.id` es el id de la clínica
                  // setDialogOpen(true)
                  setDialog({
                    type: OPTIONS_CRUD.DELETE,
                    serviceId: row.original.id!,
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
        filterableColumns={[
          {
            id: 'state',
            options: (
              Object.keys(SERVICESTATUSTRANSLATIONS) as ServiceStatusKey[]
            ).map((key) => ({
              value: key,
              label: SERVICESTATUSTRANSLATIONS[key] as string,
            })),
            title: 'Filtrar estado',
          },
        ]}
        searchableColumns={[
          {
            id: 'name',
            title: 'servicio',
          },
        ]}
      />
      {/* For delete service */}
      {dialog.type === OPTIONS_CRUD.DELETE && (
        <ConfirmDeleteDialog
          isOpen={dialog.isOpen}
          onClose={() => handleDialogClose()}
          onConfirm={() => handleDeleteService(dialog.serviceId)}
        />
      )}
      {/* For edit service */}
      {dialog.type === OPTIONS_CRUD.UPDATE && (
        <FormService
          title='Editar servicio:'
          isOpen={dialog.isOpen}
          onClose={handleDialogClose}
          onConfirm={handleUpdateService}
          initialValues={dialog.service}
        />
      )}
    </>
  )
}
