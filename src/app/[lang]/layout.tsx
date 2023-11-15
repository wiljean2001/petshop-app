// src/app/[lang]/layout.tsx
import Provider from '@/providers/providers'
import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Locale, i18n } from '@/config/i18n.config'
import { TailwindIndicator } from '@/components/tailwind-indicator'
import { cn, constructMetadata } from '@/lib/utils'
import { montserrat } from '@/components/fonts'
// const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = constructMetadata()

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: Locale }
}) {
  // inter.className
  return (
    <html lang={params.lang}>
      <body className={cn(montserrat.className,
        'antialiased flex flex-col min-h-screen')}>
        <Provider>{children}</Provider>
        <TailwindIndicator />
      </body>
    </html>
  )
}