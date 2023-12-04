import { IVeterinarian } from '@/models/schemas.d'
import { useRouter } from 'next/navigation'
import { createVeterinarian } from '@/services/admin/veterinarias'
import { FormVeterinarian } from './form'
import { showToast } from '@/helpers/toast'

interface Props {
  isOpen: boolean
  onClose: () => void
}
export const AddVeterinarian = ({ isOpen, onClose }: Props) => {
  const route = useRouter()

  const onHandle = async (input: IVeterinarian) => {
    const res = await createVeterinarian({ input })
    if (res) {
      showToast(
        '¡Éxito! El veterinario ha sido registrado satisfactoriamente.',
        'success'
      )
      route.refresh()
      return true
    }
    showToast(
      'Advertencia: El veterinario no se ha registrado completamente. Por favor, completa todos los campos requeridos.',
      'warning'
    )
    return false
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
// ananmnesis
// presuntivo
// examenes de complemento

// Mascotas
// Derivación de otras clinicas o donde sea

// 608
