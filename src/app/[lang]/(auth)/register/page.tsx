import { HeaderLoginForm } from '@/components/layout/auth/header-login-form'
import { FooterLoginForm } from '@/components/layout/auth/footer-login-form'
import SignUpForm from './signup-form'
import { ERoutingPath } from '@/config/docs'
import { NextPage } from 'next'

export const metadata = {
  title: 'Registrar',
  description: 'Pagina para registrar un usuario en vet-app',
}

const Register: NextPage = () => {
  return (
    <div className='flex flex-col items-center justify-center w-full max-w-xl'>
      <HeaderLoginForm title='Crear una cuenta' subTitle='Ingresa tus datos' />
      <SignUpForm />
      <FooterLoginForm
        option={{
          message: '¿Tienes una cuenta?',
          href: ERoutingPath.LOGIN,
          title: 'Iniciar sesión',
        }}
      />
    </div>
  )
}

export default Register
