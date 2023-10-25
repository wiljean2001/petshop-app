import SimpleCard from '@/components/cards/simple-card'
import { UsersTableShell } from '@/components/data-table-shell/users/users-table-shell'
import { db } from '@/lib/prisma'

interface MillionPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function UsersPage({ searchParams }: MillionPageProps) {
  const { page, per_page, sort, name, email, role } = searchParams
  console.log({
    name,
    email,
    role,
  })

  const limit = typeof per_page === 'string' ? parseInt(per_page) : 10

  const skip = (typeof page === 'string' ? parseInt(page) - 1 : 0) * limit
  const take = typeof per_page === 'string' ? parseInt(per_page) : 10

  // const orderBy: any = typeof sort === "string" ? { [sort.split('.')[0]]: sort.split('.')[1] } : { id: 'desc' }

  const where = {
    name: typeof name === 'string' ? { contains: name } : undefined,
  }

  const allUser = db.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
    skip,
    take,
    orderBy:
      typeof sort === 'string'
        ? { [sort.split('.')[0]]: sort.split('.')[1] }
        : { id: 'desc' },
    where,
  })

  const totalUsers = db.user.count({ where })

  const result = await db.$transaction([allUser, totalUsers])

  const pageCount = Math.ceil(result[1] / limit)
  console.log('🚀 ~ file: page.tsx:43 ~ UsersPage ~ result:', result)

  return (
    <div>
      <h3 className='text-2xl font-semibold leading-none tracking-tight'>
        Usuarios
      </h3>
      {/* Buttons for add, edit, delete a clinic */}
      {/* <HeaderClinics /> */}
      <UsersTableShell data={result[0]} pageCount={pageCount} />
    </div>
  )
}
