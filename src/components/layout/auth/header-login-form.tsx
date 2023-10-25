import LogoAvatar from '@/components/logo-avatar'
type Props = {
  title: string
  subTitle: string
}

export const HeaderLoginForm = ({ title, subTitle }: Props) => {
  return (
    <>
      <LogoAvatar />
      <h2 className='text-2xl font-semibold mb-4'>{title}</h2>
      <p className='mb-2'>{subTitle}</p>
    </>
  )
}
