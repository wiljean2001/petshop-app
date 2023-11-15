import { i18n } from '@/config/i18n.config'
import getLocale from '@/lib/i18n/locale'
import { NextRequest, NextResponse } from 'next/server'
import { auth } from './lib/next-auth/options'
import { NextApiRequest } from 'next'

const publicPages = ['/', '/login', '/register']

const corsOptions: {
  allowedMethods: string[]
  allowedOrigins: string[]
  allowedHeaders: string[]
  exposedHeaders: string[]
  maxAge?: number
  credentials: boolean
} = {
  allowedMethods: (process.env?.ALLOWED_METHODS || '').split(','),
  allowedOrigins: (process.env?.ALLOWED_ORIGIN || '').split(','),
  allowedHeaders: (process.env?.ALLOWED_HEADERS || '').split(','),
  exposedHeaders: (process.env?.EXPOSED_HEADERS || '').split(','),
  maxAge: (process.env?.MAX_AGE && parseInt(process.env?.MAX_AGE)) || undefined, // 60 * 60 * 24 * 30, // 30 days
  credentials: process.env?.CREDENTIALS == 'true',
}

function isPublicPage(pathname: string, locale: string): boolean {
  const publicPathnameRegex = RegExp(
    `^(/(${locale}))?(${publicPages.join('|')})?/?$`,
    'i'
  )
  return publicPathnameRegex.test(pathname)
}

function setCORSHeaders(req: NextRequest) {
  const response = NextResponse.next()
  const {
    allowedMethods,
    allowedOrigins,
    allowedHeaders,
    exposedHeaders,
    maxAge,
    credentials,
  } = corsOptions

  response.headers.set(
    'Access-Control-Allow-Origin',
    allowedOrigins.includes('*') ? '*' : req.headers.get('origin') || ''
  )
  response.headers.set(
    'Access-Control-Allow-Credentials',
    credentials.toString()
  )
  response.headers.set('Access-Control-Allow-Methods', allowedMethods.join(','))
  response.headers.set('Access-Control-Allow-Headers', allowedHeaders.join(','))
  response.headers.set(
    'Access-Control-Expose-Headers',
    exposedHeaders.join(',')
  )
  response.headers.set('Access-Control-Max-Age', maxAge?.toString() ?? '')
}

// export function middleware(request: NextRequest) {
//   // const { pathname } = request.nextUrl;

//     return (authMiddleware as any)(request)
// }

// `withAuth` augments your `Request` with the user's token.
// export default auth((req) => {
//   // req.auth
// })

export default auth(
  (req) => {
    const pathname = req.nextUrl.pathname
    const [_, lang, role, ...rest] = pathname.split('/')
    const locale = getLocale(req)

    const pathnameIsMissingLocale = i18n.locales.every(
      (locale) =>
        !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    )
    if (pathnameIsMissingLocale) {
      // Redirect if there is no locale
      return NextResponse.redirect(
        new URL(
          `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
          req.url
        )
      )
    }

    setCORSHeaders(req)

    const session = req.auth
    if (!isPublicPage(pathname, locale!)) {
      if (
        pathname.startsWith(`/${lang}/${role}`) &&
        session?.user.role !== role
      ) {
        return NextResponse.rewrite(new URL('/', req.url))
      }
    }
    // const regexAdmin = new RegExp('/api/admin/*')
    // const regexUser = new RegExp('/api/user/*')
    // if (regexAdmin.test(req.url) && req.token?.role !== 'admin') {
    //   return NextResponse.rewrite(new URL('/', req.url))
    // }
    // if (regexUser.test(req.url) && req.nextauth.token?.role !== 'user') {
    //   return NextResponse.rewrite(new URL('/', req.url))
    // }
  }
  // {
  //   callbacks: {
  //     authorized: ({ token }) => !!token,
  //   },
  //   pages: {
  //     signIn: '/login',
  //     signOut: '/login',
  //     // error: '/login',
  //   },
  // }
)

// Pages protected
export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}
