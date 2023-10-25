import GitHubProvider, { GithubProfile } from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { db } from '@/lib/prisma'
import { ROLES } from '@/config/auth'
import { NextAuthOptions } from 'next-auth'
import { Role, User } from '@prisma/client'

let userRoleId: Role // Variable para almacenar el roleId

async function getRoleId(roleName: string) {
  if (!userRoleId) {
    // Si userRoleId no está definido, realiza la consulta
    const role = await db.role.findUnique({
      where: { name: roleName },
    })
    if (!role) throw new Error('Role not found')
    userRoleId = role // Almacena el roleId en userRoleId
  }
  return userRoleId // Retorna el roleId almacenado
}

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    GitHubProvider({
      async profile(profile: GithubProfile): Promise<User> {
        const role = await getRoleId(ROLES.USER)
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          roleId: role.id,
          image: profile.avatar_url || profile.image,
          email: profile.email || profile.name || profile.login,
          password: profile.password,
          emailVerified: profile.emailVerified,
          createdAt: new Date(profile.created_at),
          updatedAt: new Date(profile.updated_at),
        }
      },

      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),

    CredentialsProvider({
      type: 'credentials',
      // name: 'Credentials',
      credentials: {},
      async authorize(credentials, req) {
        console.log(
          '🚀 ~ file: options.ts:36 ~ authorize ~ credentials:',
          credentials
        )
        try {
          const { email, password } = credentials as {
            email: string
            password: string
          }

          const res = await fetch(
            `${process.env.NEXTAUTH_URL}/api/user/login`,
            {
              method: 'POST',
              body: JSON.stringify({ email, password }),
              headers: {
                'Content-Type': 'application/json',
              },
            }
          )
          const user = await res.json()
          console.log('🚀 ~ file: options.ts:57 ~ authorize ~ user:', user)
          if (res.ok && user) {
            return user
          } else {
            return null
          }
        } catch (error) {
          throw new Error('Error!... ' + error)
        }
      },
    }),
    // GoogleProvider({

    //   clientId: process.env.GOOGLE_CLIENT_ID as string,

    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,

    // }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60,
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 30,
  },
  pages: {
    signIn: '/login',
    signOut: '/login',
    error: '/login',
  },
  callbacks: {
    async session({ session, token }) {
      //user
      // if (user !== null) {
      //   session.user = { ...user, name: user.name || '' }
      // }
      if (session.user) {
        const role = token.role || (token.role as any).name
        session.user.id = token.id as string
        session.user.role = role
        session.user.accessToken = token.accessToken as string
      }
      return session
    },
    async jwt(params: any) {
      const { user, account } = params
      if (!user) return params.token // Retorna temprano si no hay user

      const { roleId, role: userRole } = user
      let role

      if (roleId && !userRole) {
        const _role = await getRoleId(ROLES.USER)
        role = _role.name
        console.log('🚀 ~ file: options.ts:134 ~ jwt ~ role:', role)
      } else {
        role = (userRole as Role).name || userRole
      }
      console.log('🚀 ~ file: options.ts:145 ~ jwt ~ {}:', {
        ...params.token,
        role,
        id: user.id,
        accessToken: account.access_token,
      })

      return {
        ...params.token,
        role,
        id: user.id,
        accessToken: account.access_token,
      }
    },
  },
}

export { authOptions }
