import { MedicalRecord } from '@/types'

interface PetDetailsProps {
  pet: MedicalRecord
}

const PetDetails: React.FC<PetDetailsProps> = ({ pet }) => {
  return (
    <div className='shadow-md rounded-lg p-4 my-4'>
      <h2 className='text-xl font-semibold mb-2'>Detalles de la Mascota</h2>
      <p className='text-sm text-gray-600 dark:text-gray-300'>
        <strong>Nombre:</strong> {pet.name}
      </p>
      <p className='text-sm text-gray-600 dark:text-gray-300'>
        <strong>Género:</strong> {pet.gender}
      </p>
      <p className='text-sm text-gray-600 dark:text-gray-300'>
        <strong>Color:</strong> {pet.color}
      </p>
      <p className='text-sm text-gray-600 dark:text-gray-300'>
        <strong>Raza:</strong> {pet.breed.name}
      </p>
      <p className='text-sm text-gray-600 dark:text-gray-300'>
        <strong>Especie:</strong> {pet.breed.specie?.name}
      </p>
      <p className='text-sm text-gray-600 dark:text-gray-300'>
        <strong>Notas:</strong> {!pet.medicalNotes && 'Sin registro'}
      </p>
      {/* Añadir más detalles según sea necesario */}
    </div>
  )
}

export default PetDetails
