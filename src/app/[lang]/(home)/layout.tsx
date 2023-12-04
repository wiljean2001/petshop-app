import { DocsSidebarNav } from '@/components/layout/sidebar/sidebar-nav'
import { SiteHeader } from '@/components/layout/sidebar/site-header'
import { ScrollArea } from '@/components/ui/scroll-area'
import { docsConfig } from '@/config/docs'
import { getCurrentUser } from '@/helpers/get-server-session'
// import Footer from '@/components/layout/footer/footer'

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()

  const { mainNav, sidebarNav } = docsConfig(
    user?.role === 'admin' ? 'admin' : 'user'
  )

  return (
    <>
      <SiteHeader mainNav={mainNav} sidebarNav={sidebarNav} />
      {!user ? (
        <main>{children}</main>
      ) : (
        <div className='container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-10'>
          <aside className='fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block'>
            <ScrollArea className='h-full py-6 pl-4 pr-4 lg:py-8'>
              <DocsSidebarNav items={sidebarNav} />
            </ScrollArea>
          </aside>
          <main className='md:py-8'>{children}</main>
        </div>
      )}
      {/* <Footer /> */}
    </>
  )
}
