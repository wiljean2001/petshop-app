import { getCurrentUser } from '@/helpers/get-server-session'
import { db } from '@/lib/prisma'
import { redirect } from 'next/navigation'

export default async function PetsUserPage() {
  const user = await getCurrentUser()

  const owners = await db.user.findUnique({
    where: { id: user?.id },
    select: {
      Owner: {
        select: {
          id: true,
          Pet: {
            select: {
              name: true,
              birthdate: true,
              color: true,
              gender: true,
              breed: {
                select: {
                  name: true,
                  specie: true,
                },
              },
            },
          },
        },
      },
    },
  })

  return (
    <div className='flex flex-col break-words w-full my-6 p-4 shadow-lg rounded-sm bg-card '>
      {/* <div className="max-w-lg mx-auto mt-8"> */}
      <h2 className='text-2xl font-bold'>Mis mascotas</h2>
      {/* Divider */}
      <hr className='mt-5 pl-3 my-4 md:min-w-full' />
      <div className='p-4'>
        <ul className='grid gap-4'>
          {owners && owners.Owner && owners.Owner.length > 0 ? (
            owners.Owner.map((owner) =>
              owner.Pet && owner.Pet.length > 0 ? (
                owner.Pet.map((pet, index) => (
                  <li
                    key={pet.name + index}
                    className='p-4 shadow rounded-sm transition duration-300 ease-in-out bg-card hover:bg-background'
                  >
                    <span className='text-xl font-semibold'>{pet.name}</span>
                    <p className='text-gray-500'>
                      {pet.breed.specie?.name} - {pet.breed.name}
                    </p>
                  </li>
                ))
              ) : (
                <li
                  key={owner.id}
                  className='p-4 shadow rounded-sm transition duration-300 ease-in-out bg-card hover:bg-background'
                >
                  <span className='text-xl font-semibold'>Sin registros</span>
                  <p className='text-gray-500'></p>
                </li>
              )
            )
          ) : (
            <li className='p-4  rounded-sm transition duration-300 ease-in-out bg-card hover:bg-background'>
              <span className='text-xl font-semibold'>Sin registros</span>
              <p className='text-gray-500'></p>
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}
