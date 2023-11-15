import { getCurrentUser } from '@/helpers/get-server-session'
import { redirect } from 'next/navigation'

export default async function DashboardUserPage() {
  // const user = await getCurrentUser()

  // if (!user || user.role === 'user') {
  //   redirect('/login')
  // }

  return (
    <div>
      <h1>Hello Page</h1>
    </div>
  )
}
