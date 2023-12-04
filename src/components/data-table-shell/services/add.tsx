import { IService } from '@/models/schemas.d'
import { useRouter } from 'next/navigation'
import { FormService } from './form'
import { createService } from '@/services/admin/services'
import { showToast } from '@/helpers/toast'

interface Props {
  isOpen: boolean
  onClose: () => void
}
export const AddService = ({ isOpen, onClose }: Props) => {
  const route = useRouter()

  const onHandle = async (input: IService) => {
    const res = await createService({ input })
    if (res) {
      route.refresh()
      showToast(
        '¡Éxito! El servicio ha sido registrado satisfactoriamente.',
        'success'
      )
      return true
    }
    showToast(
      'Advertencia: El servicio no se ha registrada completamente. Por favor, completa todos los campos requeridos.',
      'warning'
    )
    return false
  }

  return (
    <>
      <FormService
        title='Registar servicio:'
        isOpen={isOpen}
        onClose={() => onClose()}
        onConfirm={onHandle}
      />
    </>
  )
}
