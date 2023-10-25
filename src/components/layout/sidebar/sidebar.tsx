import { DocsSidebarNav } from './sidebar-nav'
import { docsConfig } from '@/config/docs'
import { getSSession } from '@/helpers/get-server-session'

export const Sidebar = async () => {
  const session = await getSSession()
  const role = session?.user.role
  const { sidebarNav } = docsConfig(role)

  return (
    <>
      <DocsSidebarNav items={sidebarNav} />
    </>
  )
}
