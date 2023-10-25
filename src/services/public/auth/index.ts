import { siteConfig } from '@/config/site'
import { ILoginForm, ISingUpForm, IUserRestrict } from '@/models/user'
import { signIn } from 'next-auth/react'

export async function login(values: ILoginForm) {
  const res = await signIn('credentials', {
    ...values,
    redirect: false,
  })
  if (!res?.ok) {
    return false
  }
  return true
}

export async function signUp(values: ISingUpForm) {
  const res = await fetch(`${siteConfig.url}/api/user/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values),
  })

  if (!res.ok) {
    throw new Error('Internal error: ' + res.statusText)
  }

  const user: IUserRestrict = await res.json()
  return user
}
