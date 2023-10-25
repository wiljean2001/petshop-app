// export { default } from "next-auth/middleware";
import { i18n } from '@/config/i18n.config'
import getLocale from '@/lib/i18n/locale'
import { withAuth } from 'next-auth/middleware'
import { NextRequest, NextResponse } from 'next/server'
import { ROLES } from './config/auth'

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

export function middleware(request: NextRequest) {
  // const { pathname } = request.nextUrl;
  // const locale = getLocale(request);

  const pathname = request.nextUrl.pathname
  const locale = getLocale(request)

  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )
  if (pathnameIsMissingLocale) {
    // Redirect if there is no locale
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
        request.url
      )
    )
  }

  if (!isPublicPage(pathname, locale!)) {
    return (authMiddleware as any)(request)
  }
}

const authMiddleware = withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    setCORSHeaders(req)
    const pathname = req.nextUrl.pathname
    const token = req.nextauth.token

    const [_, lang, role, ...rest] = pathname.split('/')

    if (token?.role !== role) {
      return NextResponse.redirect(
        new URL(`/${lang}/${token?.role}/${rest}`, req.url)
      )
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: '/login',
      signOut: '/login',
      // error: '/login',
    },
  }
)

// Pages protected
export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}

// '/admin/:path*',
// '/user/:path*',
// '/((?!api|_next/static|_next/image|favicon.ico).*)',
// '/api/graphql/', // :path*
// '/api/user/:path*',
// , "/api/admin/:path*", "/api/user/:path*"

// const regexAdmin = new RegExp("/api/admin/*");
// const regexUser = new RegExp("/api/user/*");
// if (regexAdmin.test(req.url) && token.role !== "admin") {
//   console.log(
//     "\n ------------------- TEST REGIX ADMIN ------------------- \n"
//   );
//   return NextResponse.rewrite(new URL("/", req.url));
// }
// if (regexUser.test(req.url) && token.role !== "user") {
//   console.log(
//     "\n ------------------- TEST REGIX USER ------------------- \n"
//   );
//   return NextResponse.rewrite(new URL("/", req.url));
// }
