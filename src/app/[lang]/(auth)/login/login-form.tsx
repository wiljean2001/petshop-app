'use client'
import valibotResolver from '@/lib/valibotResolver'
import CustomForm from '@/components/forms/Form'
import { showToast } from '@/helpers/toast'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { ILoginForm, LoginFormSchema } from '@/models/user'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { login } from '@/services/public/auth'

const LoginForm = () => {
  const router = useRouter()

  const inputsForm = useMemo(() => {
    return [
      {
        name: 'email',
        type: 'text',
        autoComplete: 'email',
        placeHolder: 'Nombre de usuario o Email',
        className: 'mb-2 col-span-4',
      },
      {
        name: 'password',
        autoComplete: 'password',
        placeHolder: 'Contraseña',
        type: 'password',
        className: 'col-span-4',
      },
    ]
  }, [])
  const form = useForm<ILoginForm>({
    resolver: valibotResolver(LoginFormSchema),
    defaultValues: {
      email: '',
      password: '',
      // remember: false,
    },
  })

  async function onSubmit(values: ILoginForm) {
    const isLogged = login(values)
    if (!isLogged) {
      // login failed
      showToast(
        'Inicio de sesión fallido, email o contraseña incorrectos',
        'error'
      )
    }
    // Is the user logged in
    router.refresh()
  }

  return (
    <CustomForm
      form={form}
      handleSubmit={onSubmit}
      inputsForm={inputsForm}
      buttons={[
        {
          title: 'Ingresar',
          className: 'col-start-2 col-span-2',
        },
      ]}
    />
  )
}

export default LoginForm
