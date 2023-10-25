import { cn } from '@/lib/utils'
import { container, item } from '@/lib/animations'
import * as motion from '@/components/motion'

interface Props {
  title: string
  isLight: boolean
  id?: string
  children: React.ReactNode
}

export const CardSection = ({ title, isLight, id, children }: Props) => {
  return (
    <motion.div
      id={id}
      variants={container}
      initial='hidden'
      exit='exit'
      whileInView='show'
      viewport={{ once: false }}
      className={cn('py-12 backdrop-blur mx-auto px-20 text-center', {
        ' dark:bg-gray-700': isLight,
        'bg-gray-100/50 dark:bg-gray-800': !isLight,
      })}
    >
      <motion.div variants={item}>
        <h2 className='text-3xl md:text-5xl font-bold mb-10 text-primary'>
          {title}
        </h2>
        {children}
      </motion.div>
    </motion.div>
  )
}
