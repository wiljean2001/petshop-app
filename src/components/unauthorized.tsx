import * as motion from '@/components/motion'
import { Icons } from '@/components/icons'
export const Unauthorized = ({ message }: { message?: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className='unauthorized-component flex flex-col items-center justify-center h-screen bg-gray-100'
    >
      <div className='icon mb-4'>
        <Icons.alertCircle color='#FF5733' size={48} />
      </div>
      <div className='message text-gray-700 text-center'>
        {message || 'No estás autorizado para acceder a esta sección.'}
      </div>
    </motion.div>
  )
}
