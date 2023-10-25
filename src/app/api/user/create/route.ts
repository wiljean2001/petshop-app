import { ROLES } from '@/config/auth'
import { hashPassword } from '@/lib/hash'
import { db } from '@/lib/prisma'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { NextResponse, NextRequest } from 'next/server'

async function getRoleId(roleName: string): Promise<string | null> {
  const role = await db.role.findUnique({
    where: { name: roleName },
  })
  return role?.id ?? null
}

export async function POST(req: Request) {
  let errors = []
  // get name, email and password from req.body
  const { name, email, password } = await req.json()

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters')
    return NextResponse.json({ errors }, { status: 422 })
  }

  try {
    // Find the user role
    const role = await getRoleId(ROLES.USER)
    if (!role) {
      errors.push('Internal error')
      return NextResponse.json({ errors }, { status: 400 })
    }

    // Create new user
    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashPassword(password),
        role: {
          connect: {
            id: role,
          },
        },
      },
    })
    return NextResponse.json({ user }, { status: 201 })
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return NextResponse.json({ message: error.message }, { status: 400 })
      }

      return NextResponse.json({ message: error.message }, { status: 400 })
    }
  }
}
