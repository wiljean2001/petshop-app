import { useForm } from 'react-hook-form'
import { IClinic, IVeterinarian, VeterinarianSchema } from '@/models/schemas'
import valibotResolver from '@/lib/valibotResolver'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { WithFormDialog } from '../config'
import { createVeterinarian } from '@/services/admin/veterinarias'
import { FieldConfig, Option } from '@/types'
import { getClinics } from '@/services/user/clinics'
import { FormVeterinarian } from './form'

interface Props {
  isOpen: boolean
  onClose: () => void
}
export const AddVeterinarian = ({ isOpen, onClose }: Props) => {
  const route = useRouter()
  
  const onHandle = async (input: IVeterinarian) => {
    try {
      const res = await createVeterinarian({ input })
      if (res) {
        route.refresh()
        onClose()
      }
    } catch (error) {
      console.log('🚀 ~ add clinic ~ onHandle ~ error:', error)
    }
  }

  return (
    <FormVeterinarian
      title='Registar veterinario:'
      isOpen={isOpen}
      onClose={() => onClose()}
      onConfirm={onHandle}
    />
  )
}
