import LoginForm from './login-form'
import { HeaderLoginForm } from '@/components/layout/auth/header-login-form'
import { FooterLoginForm } from '@/components/layout/auth/footer-login-form'
import { NextPage } from 'next'
import { ERoutingPath } from '@/config/docs'

export const metadata = {
  title: 'Login',
  description: 'Página para iniciar sesión en vet-app',
}


const Login: NextPage = () => {
  return (
    <div className='flex flex-col items-center justify-center w-full max-w-xl'>
      <HeaderLoginForm title='Bienvenido' subTitle='Inicia Sesión' />
      <LoginForm />
      <FooterLoginForm
        option={{
          message: '¿No tienes una cuenta?',
          href: ERoutingPath.REGISTER,
          title: 'Registrarse',
        }}
      />
    </div>
  )
}

export default Login
