import { IClinic } from '@/models/schemas.d'
import { createClinic } from '@/services/admin/clinics'
import { showToast } from '@/helpers/toast'
import { FormClinic } from './form'
import { useRouter } from 'next/navigation'

interface Props {
  isOpen: boolean
  onClose: () => void
}
export const AddClinic = ({ isOpen, onClose }: Props) => {
  const route = useRouter()

  const handleCreateClinic = async (input: IClinic) => {
    const res = await createClinic({ input })
    if (res) {
      showToast(
        '¡Éxito! La clinica ha sido registrada satisfactoriamente.',
        'success'
      )
      route.refresh()
      return true
    }
    showToast(
      'Advertencia: La clinica no se ha registrada completamente. ' +
        'Por favor, completa todos los campos requeridos.',
      'warning'
    )
    return false
  }

  return (
    <FormClinic
      title='Registar local:'
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleCreateClinic}
    />
  )
}
