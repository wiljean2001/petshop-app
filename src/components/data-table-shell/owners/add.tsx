import { IOwner } from '@/models/schemas.d'
import { createOwner } from '@/services/admin/owners'
import { showToast } from '@/helpers/toast'
import { FormOwner } from './form'
import { useRouter } from 'next/navigation'
import { IUserRestrict } from '@/models/user'

interface Props {
  isOpen: boolean
  onClose: () => void
  users: IUserRestrict[]
}
export const AddOwner = ({ isOpen, onClose, users }: Props) => {
  const route = useRouter()

  const handleCreateOwner = async (input: IOwner) => {
    const res = await createOwner({ input })
    if (res) {
      showToast(
        '¡Éxito! El dueño de la mascota ha sido registrado satisfactoriamente.',
        'success'
      )
      route.refresh()
      return true
    }
    showToast(
      'Advertencia: El dueño de la mascota no se ha registrado completamente. Por favor, completa todos los campos requeridos.',
      'warning'
    )
    return false
  }

  return (
    <>
      <FormOwner
        title='Registar dueño de mascota:'
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={handleCreateOwner}
        users={users}
      />
    </>
  )
}
