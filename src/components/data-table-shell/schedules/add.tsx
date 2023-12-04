import { ISchedule } from '@/models/schemas.d'
import { createSchedule } from '@/services/admin/schedules'
import { useRouter } from 'next/navigation'
import { FormSchedule } from './form'
import { showToast } from '@/helpers/toast'

interface Props {
  isOpen: boolean
  onClose: () => void
}
export const AddSchedule = ({ isOpen, onClose }: Props) => {
  const route = useRouter()
  const onHandle = async (input: ISchedule) => {
    const res = await createSchedule({ input })
    if (res) {
      showToast(
        '¡Éxito! El horario ha sido registrado satisfactoriamente.',
        'success'
      )
      route.refresh()
      return true
    }
    showToast(
      'Advertencia: El horario no se ha registrada completamente. Por favor, completa todos los campos requeridos.',
      'warning'
    )
    return false
  }

  return (
    <>
      <FormSchedule
        title='Registar horario:'
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={onHandle}
      />
    </>
  )
}
