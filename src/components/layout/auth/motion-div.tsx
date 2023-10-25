'use client'
// MotionDiv.tsx
import * as motion from '@/components/motion'
import { usePathname } from 'next/navigation'
import React from 'react'
import { useMotionStyles } from '@/hooks/use-motion-styles' // Adjust the import path as needed
import { cn } from '@/lib/utils'

type Props = {
  children: React.ReactNode
  className?: string
  isForm: boolean
}

export const MotionDiv: React.FC<Props> = ({ children, className, isForm }) => {
  const pathName = usePathname()
  const { variants, computedClassName } = useMotionStyles({
    pathName,
    isForm,
  })

  return (
    <motion.div
      className={cn(className, computedClassName)}
      initial='initial'
      animate='animate'
      exit='exit'
      variants={variants}
    >
      {children}
    </motion.div>
  )
}

// import * as motion from '@/components/motion'
// import { cn } from '@/lib/utils'
// import { usePathname } from 'next/navigation'

// type Props = {
//   children: React.ReactNode
//   className: string
//   isForm: boolean
// }

// // <!-- Definimos las animaciones -->
// const slideInFromLeft = {
//   initial: { x: '-100%', opacity: 0 },
//   animate: { x: '0%', opacity: 1 },
//   exit: { x: '-100%', opacity: 0 },
// }

// const slideInFromRight = {
//   initial: { x: '100%', opacity: 0 },
//   animate: { x: '0%', opacity: 1 },
//   exit: { x: '100%', opacity: 0 },
// }

// export const MotionDiv = ({ children, className, isForm }: Props) => {
//   const pathName = usePathname()

//   return (
//     <motion.div
//       className={cn(
//         className,
//         pathName === '/es/signin'
//           ? isForm
//             ? 'md:order-1'
//             : 'md:order-2'
//           : isForm
//           ? 'md:order-2'
//           : 'md:order-1'
//       )}
//       initial='initial'
//       animate='animate'
//       exit='exit'
//       variants={pathName === 'signin' ? slideInFromRight : slideInFromLeft}
//     >
//       {children}
//     </motion.div>
//   )
// }
