import { getCurrentUser } from '@/helpers/get-server-session'
import Link from 'next/link'

export const metadata = {
  title: 'Bienvenido',
}

export default async function DashboardUserPage() {
  const user = await getCurrentUser()

  return (
    <div className='flex flex-col items-center justify-center h-[calc(100vh-10rem)] text-black'>
      <h1 className='text-4xl font-bold mb-4'>
        ¡Bienvenido {user?.name} al portal del propietario!
      </h1>
      <p className='text-lg'>
        Aquí podrás acceder a la información de tus mascotas.
      </p>
      <Link
        href='/user/pets'
        className='mt-4 bg-white text-blue-500 py-2 px-4 rounded-lg font-semibold hover:bg-blue-100 transition duration-300 ease-in-out'
      >
        Ver mis mascotas
      </Link>
    </div>
  )
}
