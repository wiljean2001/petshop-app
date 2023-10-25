import { CircleButtonBack } from '@/components/circle-button-back'
import { Card } from '@/components/ui/card'
import logo_login from '@/img/dog_shaking.webp'
import { MotionDiv } from '@/components/layout/auth/motion-div'
import { redirect } from 'next/navigation'
import { getSSession } from '@/helpers/get-server-session'

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSSession()
  if (session) {
    const role = session.user.role
    redirect(`/${role}`)
  }
  return (
    <main className='bg-gradient-to-b from-white to-blue-200 dark:bg-background dark:from-background/60'>
      <div className='sticky z-20 flex flex-col justify-center items-center h-screen overflow-hidden'>
        <Card className='text-center shadow-lg flex flex-col md:flex-row justify-between w-3/4 md:w-2/4 bg-background'>
          {/* <!-- Logo animation --> */}
          <MotionDiv
            className='z-10 flex items-center justify-center w-full h-auto rounded-t-lg'
            isForm={false}
          >
            <img
              src={logo_login.src}
              alt='Logo'
              className='w-1/2 lg:w-full object-cover'
              loading='lazy'
              fetchPriority='high'
            />
          </MotionDiv>
          <MotionDiv
            className='p-3 w-full h-auto md:w-1/2 lg:w-2/4 xl:w-2/3'
            isForm={true}
          >
            <CircleButtonBack className='absolute top-0 m-2 p-2 rounded z-10 left-0' />
            {children}
          </MotionDiv>
        </Card>
      </div>
    </main>
  )
}
