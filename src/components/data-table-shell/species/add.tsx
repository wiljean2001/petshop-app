import { ISpecie } from '@/models/schemas.d'
import { createSpecie } from '@/services/admin/species'
import { useRouter } from 'next/navigation'
import { showToast } from '@/helpers/toast'
import { FormSpecie } from './form'

interface Props {
  isOpen: boolean
  onClose: () => void
}
export const AddSpecie = ({ isOpen, onClose }: Props) => {
  const router = useRouter()

  const onHandle = async (input: ISpecie) => {
    const res = await createSpecie({ input })
    if (res) {
      router.refresh()
      showToast(
        '¡Éxito! La Especie ha sido registrado satisfactoriamente.',
        'success'
      )
      return true
    }

    showToast(
      'Advertencia: La especie no se ha registrado completamente. Por favor, completa todos los campos requeridos.',
      'warning'
    )
    return false
  }

  return (
    <>
      <FormSpecie
        title='Registar especie:'
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={onHandle}
      />
    </>
  )
}
