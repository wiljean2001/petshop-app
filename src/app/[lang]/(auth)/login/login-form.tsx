'use client'
import valibotResolver from '@/lib/valibotResolver'
import { showToast } from '@/helpers/toast'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { ILoginForm, LoginFormSchema } from '@/models/user'
import { useRouter } from 'next/navigation'
import { login } from '@/services/public/auth'
import { DynamicForm } from '@/components/forms/dynamic-form'
import { FieldConfig } from '@/types'

const LoginForm = () => {
  const router = useRouter()

  const inputsForm = useMemo((): FieldConfig[] => {
    return [
      {
        name: 'email',
        type: 'text',
        // autoComplete: 'email',
        placeholder: 'Correo electrónico',
        // className: 'mb-2 col-span-4',
        label: '',
      },
      {
        name: 'password',
        label: '',
        // autoComplete: 'password',
        placeholder: 'Contraseña',
        type: 'password',
        // className: 'col-span-4',
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
    const isLogged = await login(values)
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
    <DynamicForm
      formConfig={inputsForm}
      form={form}
      onSubmit={onSubmit}
      buttons={[
        {
          title: 'Ingresar',
          className: 'text-center',
        },
      ]}
    />
  )
}

export default LoginForm
