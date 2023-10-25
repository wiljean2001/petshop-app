import { MainNav } from '@/components/layout/navbar/main-nav'
import { MobileNav } from '@/components/layout/navbar/mobile-nav'
import { ThemeToggle } from '@/components/theme-toggle'

import { MainNavItem, SidebarNavItem } from '@/models/nav'
import { AuthNav } from '../navbar/auth-nav'
// import { CommandMenu } from '@/components/command-menu'
// import { useSelector } from 'react-redux'
// import { selectUser } from '@/store/selectors'

export function SiteHeader({
  // session,
  mainNav,
  sidebarNav,
}: {
  // session?: Session | null;
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}) {
  return (
    <header className='supports-backdrop-blur:bg-background/60 sticky top-0 z-40 w-full bg-background/50 backdrop-blur'>
      <div className='container flex h-14 items-center'>
        <MainNav mainNav={mainNav} />
        <MobileNav mainNav={mainNav} sidebarNav={sidebarNav} />
        <div className='flex flex-1 items-center justify-between space-x-2 md:justify-end'>
          {/* Search menu */}
          <div className='w-full flex-1 md:w-auto md:flex-none'>
            {/* <CommandMenu mainNav={mainNav} sidebarNav={sidebarNav} /> */}
          </div>
          <nav className='flex items-center gap-1'>
            {/* Facebook icon */}
            {/* <Link
              href={siteConfig.links.facebook}
              target='_blank'
              rel='noreferrer'
            >
              <div
                className={cn(
                  buttonVariants({
                    variant: 'ghost',
                  }),
                  'w-9 px-0'
                )}
              >
                <Icons.facebook className='h-4 w-4 text-primary' />
                <span className='sr-only'>Facebook</span>
              </div>
            </Link> */}
            {/* Instagram icon */}
            {/* <Link
              href={siteConfig.links.instagram}
              target='_blank'
              rel='noreferrer'
            >
              <div
                className={cn(
                  buttonVariants({
                    variant: 'ghost',
                  }),
                  'w-9 px-0'
                )}
              >
                <Icons.instagram className='h-4 w-4 text-primary' />
                <span className='sr-only'>Instagram</span>
              </div>
            </Link> */}
            {/* Toggle for theme */}
            <ThemeToggle />
            {/* Login */}
            <AuthNav />
          </nav>
        </div>
      </div>
    </header>
  )
}
