import { useRouter } from 'next/navigation'
import { showToast } from '@/helpers/toast'
import { FormUser } from './form'
import { signUp } from '@/services/public/auth'
import { ISingUpForm } from '@/models/user'

interface Props {
  isOpen: boolean
  onClose: () => void
}
export const AddUser = ({ isOpen, onClose }: Props) => {
  const router = useRouter()

  const onHandle = async (input: ISingUpForm) => {
    const res = await signUp(input)
    if (res) {
      router.refresh()
      showToast(
        '¡Éxito! El usuario ha sido registrado satisfactoriamente.',
        'success'
      )
      return true
    }

    showToast(
      'Advertencia: El usuario no se ha registrado completamente. Por favor, completa todos los campos requeridos.',
      'warning'
    )
    return false
  }

  return (
    <>
      <FormUser
        title='Registar usuario:'
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={onHandle}
      />
    </>
  )
}
