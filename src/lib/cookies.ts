// 'use server'
import { cookies } from 'next/headers'

export async function getToken() {
  const res = await getCookie('sessionID')
  return res?.value
}

export async function saveToken(token: string) {
  const res = await setCookie('sessionID', token)
  return res.has('token')
}

export async function saveUser(user: string) {
  const res = await setCookie('user', JSON.stringify(user))
  return res.has('token')
}

export async function getCookie(name: string) {
  const res = cookies().get(name)
  return res
}

export async function setCookie(name: string, value: string) {
  const res = cookies().set(name, value, { httpOnly: true, secure: true })
  return res
}
