// import * as motion from '@/components/motion'
// import { item } from '@/lib/animations'

interface Props {
  src: string
  title: string
  description: string
}

export const CardService = ({ src, title, description }: Props) => {
  return (
    <div className='bg-card p-6 rounded-lg shadow-md'>
      <img
        className='w-full h-72 object-cover'
        src={src}
        alt={title}
        width={300}
        height={200}
      />
      <h3 className='text-xl font-semibold mt-4'>{title}</h3>
      <p className='text-gray-600 dark:text-gray-200'>{description}</p>
    </div>
  )
}
