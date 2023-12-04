import { HeaderUser } from '@/components/data-table-shell/users/header'
import LoadUserTableShell from '@/components/data-table-shell/users/load-table-shell'
import { DashboardHeader } from '@/components/layout/auth/header'
import { db } from '@/lib/prisma'
import { parseSortParameter } from '@/lib/utils'
import { ISingUpForm } from '@/models/user'

interface MillionPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

export default async function UsersPage({ searchParams }: MillionPageProps) {
  const { page, per_page, sort, name, email, role } = searchParams

  const limit = typeof per_page === 'string' ? parseInt(per_page) : 10

  const skip = (typeof page === 'string' ? parseInt(page) - 1 : 0) * limit
  const take = typeof per_page === 'string' ? parseInt(per_page) : 10

  // const orderBy: any = typeof sort === "string" ? { [sort.split('.')[0]]: sort.split('.')[1] } : { id: 'desc' }

  const where = {
    name: typeof name === 'string' ? { contains: name } : undefined,
  }

  const orderBy =
    sort && typeof sort === 'string'
      ? parseSortParameter(sort)
      : { createdAt: 'desc' }

  const allUser = db.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      password: true,
      image: true,
      emailVerified: true,
      createdAt: true,
      updatedAt: true,
    },
    skip,
    take,
    orderBy,
    where,
  })

  const totalUsers = db.user.count({ where })

  const result = await db.$transaction([allUser, totalUsers])

  const pageCount = Math.ceil(result[1] / limit)

  return (
    <>
      <DashboardHeader heading='Usuarios'>
        {/* <HeaderUser /> */}
      </DashboardHeader>

      {/* Buttons for add, edit, delete a clinic */}
      {/* <HeaderClinics /> */}
      <LoadUserTableShell
        data={result[0] as ISingUpForm[]}
        pageCount={pageCount}
      />
    </>
  )
}
