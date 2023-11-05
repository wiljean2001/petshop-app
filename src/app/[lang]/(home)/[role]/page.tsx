import { getSSession } from '@/helpers/get-server-session'
import DashboardAdminPage from './dashboard_admin'
import DashboardUserPage from './dashboard_user'

interface Props {
  params: { params: { role: string } }
}

export default async function WelcomePage({ params }: Props) {
  const session = await getSSession()
  const role = session?.user.role

  if (role === 'user') {
    return <DashboardUserPage />
  }
  return <DashboardAdminPage />
}
