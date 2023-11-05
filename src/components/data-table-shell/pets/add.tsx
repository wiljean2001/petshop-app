import { IPet } from '@/models/schemas'
import { createPet } from '@/services/admin/pets'
import { showToast } from '@/helpers/toast'
import { FormPet } from './form'

interface Props {
  isOpen: boolean
  onClose: () => void
}
export const AddPet = ({ isOpen, onClose }: Props) => {
  const onHandle = async (input: IPet) => {
    console.log('🚀 ~ file: add.tsx:90 ~ onHandle ~ input:', input)
    try {
      const res = await createPet({ input })
      if (res) {
        onClose()
        showToast(
          '¡Éxito! La mascota ha sido registrada satisfactoriamente.',
          'success'
        )
        return
      }
      showToast(
        'Advertencia: La mascota no se ha registrada completamente. Por favor, completa todos los campos requeridos.',
        'success'
      )
    } catch (error) {
      showToast(
        'Error: No se pudo registrar la mascota. Por favor, inténtalo de nuevo.',
        'error'
      )
    }
  }

  return (
    <>
      <FormPet
        title='Registar mascota:'
        isOpen={isOpen}
        onClose={() => onClose()}
        onConfirm={onHandle}
      />
    </>
  )
}
