import { UserNav } from '@/components/layout/navbar/user-nav'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { Icons } from '@/components/icons'
import { ERoutingPath } from '@/config/docs'
import { getSSession } from '@/helpers/get-server-session'

export const AuthNav = async () => {
  const session = await getSSession()
  
  return (
    <>
      {!session?.user ? (
        <>
          <Link href={ERoutingPath.LOGIN}>
            <div
              className={cn(
                buttonVariants({
                  variant: 'ghost',
                }),
                'w-32 px-0 gap-1'
              )}
            >
              <span className=''>Iniciar sesión</span>
              <Icons.keyIcon className='h-4 w-4' />
            </div>
          </Link>
          <Link href={ERoutingPath.REGISTER}>
            <div
              className={cn(
                buttonVariants({
                  variant: 'default',
                }),
                'w-10 md:w-32 px-0 gap-1'
              )}
            >
              <span className='hidden md:block'>Registrarse</span>
              <Icons.login className='h-4 w-4' />
            </div>
          </Link>
        </>
      ) : (
        <>
          <UserNav user={session.user} />
        </>
      )}
    </>
  )
}
