import { IPet } from '@/models/schemas.d'
import { createPet } from '@/services/admin/pets'
import { showToast } from '@/helpers/toast'
import { FormPet } from './form'
import { useRouter } from 'next/navigation'

interface Props {
  isOpen: boolean
  onClose: () => void
}
export const AddPet = ({ isOpen, onClose }: Props) => {
  const route = useRouter()
  const onHandle = async (input: IPet) => {
    const res = await createPet({ input })
    if (res) {
      showToast(
        '¡Éxito! La mascota ha sido registrada satisfactoriamente.',
        'success'
      )
      route.refresh()
      return true
    }
    showToast(
      'Advertencia: La mascota no se ha registrada completamente. Por favor, completa todos los campos requeridos.',
      'warning'
    )
    return false
  }

  return (
    <>
      <FormPet
        title='Registar mascota:'
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={onHandle}
      />
    </>
  )
}
