'use client'

import * as React from 'react'
import Link from 'next/link'
// import { Link as LinkAnimate } from 'react-scroll'
import { useParams, usePathname, useSearchParams } from 'next/navigation'

import { siteConfig } from '@/config/site'
import { Icons } from '@/components/icons'
import { MainNavItem } from '@/models/nav'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

export function MainNav({ mainNav }: { mainNav: MainNavItem[] }) {
  const pathname = usePathname()
  const { lang } = useParams()
  
  return (
    <div className='mr-4 hidden md:flex'>
      <Link href='/' className='mr-6 flex items-center space-x-2 text-primary'>
        <Icons.logo className='h-6 w-6' />
        <span className='hidden font-bold sm:inline-block'>
          {siteConfig.name}
        </span>
      </Link>
      <Separator orientation='vertical' className='h-auto w-[1px] mx-8' />
      <nav className='flex items-center space-x-6 text-sm font-medium'>
        {mainNav.map((option, index) => {
          return (
            <Link
              // to={option.href as string}
              // spy={true}
              // smooth={true}
              // offset={-50} // Adjust the offset if needed
              // duration={500} // Adjust the duration if needed
              href={option.href as string}
              key={index}
              className={cn(
                'transition-colors hover:text-foreground/80 cursor-pointer',
                pathname === `/${lang}${option.href}`
                  ? 'text-foreground'
                  : 'text-foreground/50'
              )}
            >
              {option.title}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
