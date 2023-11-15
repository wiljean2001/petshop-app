import { createBreed } from '@/services/admin/breeds'
import { useRouter } from 'next/navigation'
import { showToast } from '@/helpers/toast'
import { FormBreed } from './form'
import { IBreed } from '@/models/schemas'

interface Props {
  isOpen: boolean
  onClose: () => void
}
export const AddBreed = ({ isOpen, onClose }: Props) => {
  const route = useRouter()
  const handleCreateBreed = async (input: IBreed) => {
    const res = await createBreed({ input })
    if (res) {
      showToast(
        '¡Éxito! La raza ha sido registrada satisfactoriamente.',
        'success'
      )
      route.refresh()
      return true
    }
    showToast(
      'Advertencia: La raza no se ha registrada completamente. Por favor, completa todos los campos requeridos.',
      'warning'
    )
    return false
  }

  return (
    <>
      <FormBreed
        title='Registar raza:'
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={handleCreateBreed}
      />
    </>
  )
}
