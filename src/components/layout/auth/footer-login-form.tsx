'use client'
import { ButtonGroupAuth } from '@/components/layout/auth/button-group-auth'
import { Button, buttonVariants } from '@/components/ui/button'
import { showToast } from '@/helpers/toast'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
// import a from 'next/link'
interface Props {
  option: {
    href: string
    title: string
    message: string
  }
}

const logInWithGoogle = async () => {
  showToast('Esta opción se encuentra en mantenimiento.', 'warning')
}
const logInWithGithub = async () => {
  signIn('github')
}

export const FooterLoginForm = ({ option }: Props) => {
  return (
    <>
      <div className='text-center'>- ó -</div>
      <div className='flex space-x-4 my-2 justify-center'>
        {/* Botones para iniciar sesión mediante otras formas */}
        <ButtonGroupAuth
          onHandleGoogle={logInWithGoogle}
          onHandleGithub={logInWithGithub}
        />
      </div>
      <p className='text-center'>
        {option.message}
        <Link
          href={option.href}
          className={cn(
            'text-red-700 dark:text-red-400',
            buttonVariants({
              variant: 'link',
            })
          )}
        >
          {option.title}.
        </Link>
      </p>
    </>
  )
}
