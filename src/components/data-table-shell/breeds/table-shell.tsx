'use client'

import * as React from 'react'
import { type ColumnDef } from '@tanstack/react-table'

import { Checkbox } from '@/components/ui/checkbox'

import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header'
import { MillionDataTable } from '@/components/data-table/million-data-table'
import { BreedSchema, IBreed, ISpecie } from '@/models/schemas'
import { DropdownMenuShell } from '../drop-down-menu-shell'
import { OPTIONS_CRUD, hourFormat } from '@/config/const'
import { ConfirmDeleteDialog, WithFormDialog } from '../config'
import { useForm } from 'react-hook-form'
import valibotResolver from '@/lib/valibotResolver'
import { FieldConfig } from '@/types'
import { deleteBreed } from '@/services/admin/breeds'
import { showToast } from '@/helpers/toast'
import { useRouter } from 'next/navigation'
import { getDateToString } from '@/lib/times'

interface BreedsTableShellProps {
  data: IBreed[]
  pageCount: number
}

export function BreedsTableShell({ data, pageCount }: BreedsTableShellProps) {
  const router = useRouter()
  const [isPending, startTransition] = React.useTransition()
  const [dialog, setDialog] = React.useState<{
    type: OPTIONS_CRUD | null
    isOpen: boolean
    clinicId?: string
    clinic?: IBreed | null
  }>({
    type: null,
    isOpen: false,
    clinicId: '',
    clinic: null,
  })

  const form = useForm<IBreed>({
    resolver: valibotResolver(BreedSchema),
  })

  const inputs = React.useMemo((): FieldConfig[] => {
    return [
      {
        type: 'text',
        name: 'name',
        label: 'Raza:',
        placeholder: 'Raza',
      },
      {
        type: 'select',
        name: 'specieId',
        label: 'Especie:',
        options: [],
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
      const res = await deleteBreed({ id })
      if (res) {
        router.refresh()
        form.reset()
        showToast(
          '¡Éxito! La raza ha sido eliminado satisfactoriamente.',
          'success'
        )
        return
      }
      showToast(
        'Advertencia: La raza no se ha eliminado completamente. Por favor, completa todos los campos requeridos.',
        'success'
      )
    } catch (error) {
      showToast(
        'Error: No se pudo eliminar la raza. Por favor, inténtalo de nuevo.',
        'error'
      )
    }
  }
  const updateClinic = (clinic?: IBreed | null) => {
    if (clinic) {
      // delete clinic
    }
  }

  // Memoize the columns so they don't re-render on every render
  const columns = React.useMemo<ColumnDef<IBreed, unknown>[]>(
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
        header: ({ column }) => {
          return <DataTableColumnHeader column={column} title='Raza' />
        },
        cell: ({ row }) => (
          <div className='w-[200px] max-w-[200px]'>{row.getValue('name')}</div>
        ),
      },
      {
        accessorKey: 'specie',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='Especie' />
        ),
        cell: ({ row }) => (
          <div className='w-[200px] max-w-[200px]'>
            {(row.getValue('specie') as ISpecie).name}
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
