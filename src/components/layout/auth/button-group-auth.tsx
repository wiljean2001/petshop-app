import githubSvg from '@/img/img/github.svg'
import googleSvg from '@/img/img/google.svg'

import { Button } from '@/components/ui/button'
import type { MouseEventHandler } from 'react'

export const ButtonGroupAuth = ({
  onHandleGoogle,
  onHandleGithub,
}: {
  onHandleGoogle: () => void
  onHandleGithub: () => void
}) => {
  return (
    <>
      <Button
        variant='outline'
        onClick={onHandleGoogle}
        className='flex justify-around text-center items-center'
      >
        <img
          src={googleSvg.src}
          width={35}
          height={35}
          alt='Logo github'
          className='p-1'
        />
        Google
      </Button>
      <Button
        variant='outline'
        onClick={onHandleGithub}
        className='flex justify-center text-center items-center'
      >
        <img
          src={githubSvg.src}
          width={35}
          height={35}
          alt='Logo github'
          className='p-1'
        />
        Github
      </Button>
    </>
  )
}
