'use client'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { SignUpSchema, ISingUpForm } from '@/models/user'
import valibotResolver from '@/lib/valibotResolver'
import { showToast } from '@/helpers/toast'
import { useRouter } from 'next/navigation'
import { ERoutingPath } from '@/config/docs'
import { signUp } from '@/services/public/auth'
import { DynamicForm } from '@/components/forms/dynamic-form'
import { FieldConfig } from '@/types'

const SignUpForm = () => {
  const route = useRouter()
  const form = useForm<ISingUpForm>({
    resolver: valibotResolver(SignUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  const inputsForm = useMemo((): FieldConfig[] => {
    return [
      {
        name: 'name',
        type: 'text',
        // autoComplete: 'name',
        label: '',
        placeholder: 'Nombre',
        // className: 'mb-1 col-span-4',
      },
      {
        name: 'email',
        type: 'email',
        label: '',
        // autoComplete: 'email',
        placeholder: 'Email',
        // className: 'mb-1 col-span-4',
      },
      {
        name: 'password',
        type: 'password',
        label: '',
        // autoComplete: 'password',
        placeholder: 'Contraseña',
        // className: 'col-span-4',
      },
    ]
  }, [])

  const onSubmit = async (values: ISingUpForm) => {
    try {
      const user = await signUp(values)
      if (!user) {
        showToast('Correo o contraseña incorrectos.', 'error')
      }
      route.push(ERoutingPath.LOGIN)
      showToast('Ahora inicia sesión', 'success')
    } catch (error: any) {
      // Error handling is already done in signUp, so no need to duplicate here
      showToast('Error, vuelve a intentarlo.', 'error')
    }
  }

  return (
    <DynamicForm
      formConfig={inputsForm}
      form={form}
      onSubmit={onSubmit}
      buttons={[
        {
          title: 'Registrarse',
          className: 'col-start-2 col-span-2',
        },
      ]}
    />
  )
}

export default SignUpForm
