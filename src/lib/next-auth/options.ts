import GitHub, { GitHubProfile } from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { db } from '@/lib/prisma'
import { type User } from '@prisma/client'
import NextAuth from 'next-auth'

// let userRoleId: Role // Variable para almacenar el roleId

// async function getRoleId(roleName: string) {
//   if (!userRoleId) {
//     // Si userRoleId no está definido, realiza la consulta
//     const role = await db.role.findUnique({
//       where: { name: roleName },
//     })
//     if (!role) throw new Error('Role not found')
//     userRoleId = role // Almacena el roleId en userRoleId
//   }
//   return userRoleId // Retorna el roleId almacenado
// }

// export const {
//   handlers: { GET, POST },
// auth,

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    GitHub({
      async profile(profile: GitHubProfile): Promise<User> {
        // const role = await getRoleId(ROLES.USER)
        return {
          id: profile.id.toString(),
          name: profile.name || profile.login,
          // ...profile as unknown as User,
          role: profile.role === 'user' ? 'user' : 'admin',
          // roleId: role.id,
          image: profile.avatar_url || (profile.image as string),
          email: profile.email || profile.name || profile.login,
          password: profile.password as string,
          emailVerified: (profile.emailVerified as Date) || null,
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
        try {
          const { email, password } = credentials as {
            email: string
            password: string
          }

          const res = await fetch(
            `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/user/login`,
            {
              method: 'POST',
              body: JSON.stringify({ email, password }),
              headers: {
                'Content-Type': 'application/json',
              },
            }
          )
          const user = await res.json()
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
        session.user.id = token.id as string
        session.user.role = token.role as string
        session.user.accessToken = token.accessToken as string
      }
      return session
    },
    async jwt(params: any) {
      const { token, user, account } = params
      if (!user) return token // Retorna temprano si no hay user
      // if (roleId && !userRole) {
      // const _role = await getRoleId(ROLES.USER)
      // role = _role.name
      //   console.log('🚀 ~ file: options.ts:134 ~ jwt ~ role:', role)
      // } else {
      //   role = (userRole as Role).name || userRole
      // }
      token.role = user.role
      return {
        ...token,
        // role,
        id: user.id,
        accessToken: account.access_token,
      }
    },
  },
})
