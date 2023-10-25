import { db } from '@/lib/prisma'
import { hashPassword } from '@/lib/hash'

import { NextResponse } from 'next/server'
import { exclude } from '@/lib/exclude'

export async function POST(req: Request) {
  const { email, password } = await req.json()
  if (!email || !password) {
    return NextResponse.json({ message: 'invalid inputs' }, { status: 400 })
  }

  console.log('🚀 ~ file: route.ts:9 ~ POST ~ { email, password }:', {
    email,
    password,
  })

  try {
    const user = await db.user.findUnique({
      where: { email: email },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        image: true,
        role: true,
      },
    })
    console.log(
      '🚀 ~ file: route.ts:31 ~ POST ~ user.password:',
      user?.password
    )
    console.log(
      '🚀 ~ file: route.ts:32 ~ POST ~ hashPassword(password):',
      hashPassword(password)
    )
    if (user && user.password === hashPassword(password)) {
      // exclude password from json response
      return NextResponse.json(exclude(user, ['password']), { status: 200 })
    } else {
      return NextResponse.json(
        { message: 'invalid credentials' },
        { status: 401 }
      )
    }
  } catch (e: any) {
    throw new Error(e.message)
  }
}
