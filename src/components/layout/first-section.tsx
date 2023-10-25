import { BackgroundPet } from '../background-pet'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { buttonVariants } from '../ui/button'

interface Props {
  title_landing: string
  description: string
}

export const FirstSection = ({ title_landing, description }: Props) => {
  return (
    <section className='min-h-screen mx-full items-center flex flex-wrap justify-center md:justify-between'>
      <div className='container w-full md:w-8/12 lg:w-6/12 xl:w-5/12 p-4'>
        <div>
          <h2 className='font-semibold text-5xl whitespace-pre-wrap'>
            {title_landing}
          </h2>
          <p className='mt-4 text-lg leading-relaxed'>
            {description}{' '}
            <Link
              href='https:facebook.com'
              className='text-primary'
              target='_blank'
              rel='noopener noreferrer'
            >
              Facebook.
            </Link>
          </p>
          <div className='mt-12 flex'>
            <Link
              href='/'
              target='_blank'
              className={cn(buttonVariants({ variant: 'default' }))}
            >
              Nuestros servicios
            </Link>
          </div>
        </div>
      </div>

      <BackgroundPet />
    </section>
  )
}
