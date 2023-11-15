import { DocsSidebarNav } from './sidebar-nav'
import { docsConfig } from '@/config/docs'
import { getCurrentUser } from '@/helpers/get-server-session'

export const Sidebar = async () => {
  const user = await getCurrentUser()
  const role = user?.role
  const { sidebarNav } = docsConfig(user?.role === 'admin' ? 'admin' : 'user')

  return (
    <>
      <DocsSidebarNav items={sidebarNav} />
    </>
  )
}
