// useMotionStyles.ts
import { slideInFromLeft, slideInFromRight } from '@/lib/animations'
import { useMemo } from 'react'

type UseMotionStylesProps = {
  pathName: string
  isForm: boolean
}

export const useMotionStyles = ({ pathName, isForm }: UseMotionStylesProps) => {
  const variants = useMemo(() => {
    return pathName === 'signin' ? slideInFromRight : slideInFromLeft
  }, [pathName])

  const computedClassName = useMemo(() => {
    return pathName === '/es/login'
      ? isForm
        ? 'md:order-1'
        : 'md:order-2'
      : isForm
      ? 'md:order-2'
      : 'md:order-1'
  }, [pathName, isForm])

  return { variants, computedClassName }
}
