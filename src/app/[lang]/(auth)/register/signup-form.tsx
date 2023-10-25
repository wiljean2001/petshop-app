'use client'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import CustomForm, { CustomOptionInput } from '@/components/forms/Form'
import { SignUpSchema, ISingUpForm } from '@/models/user'
import valibotResolver from '@/lib/valibotResolver'
import { showToast } from '@/helpers/toast'
import { useRouter } from 'next/navigation'
import { siteConfig } from '@/config/site'
import { ERoutingPath } from '@/config/docs'
import { signUp } from '@/services/public/auth'

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

  const inputsForm = useMemo((): CustomOptionInput[] => {
    return [
      {
        name: 'name',
        type: 'name',
        autoComplete: 'name',
        placeHolder: 'Nombre',
        className: 'mb-1 col-span-4',
      },
      {
        name: 'email',
        type: 'email',
        autoComplete: 'email',
        placeHolder: 'Email',
        className: 'mb-1 col-span-4',
      },
      {
        name: 'password',
        type: 'password',
        autoComplete: 'password',
        placeHolder: 'Contraseña',
        className: 'col-span-4',
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
    <CustomForm
      form={form}
      handleSubmit={onSubmit}
      inputsForm={inputsForm}
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
