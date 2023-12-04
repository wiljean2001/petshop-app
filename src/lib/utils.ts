import { type ClassValue, clsx } from 'clsx'
import { Metadata } from 'next'
import { twMerge } from 'tailwind-merge'
// import {
//   eq,
//   like,
//   not,
//   notLike,
//   type Column,
//   type ColumnBaseConfig,
//   type ColumnDataType,
// } from "drizzle-orm"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function constructMetadata({
  title = 'Petshop',
  description = 'Petshop is software to manage the attention of your pets.',
  image = '/thumbnail.png',
  icons = '/favicon.ico',
  noIndex = false,
}: {
  title?: string
  description?: string
  image?: string
  icons?: string
  noIndex?: boolean
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: '@joshtriedcoding',
    },
    icons,
    metadataBase: new URL('https://quill-jet.vercel.app'),
    // themeColor: '#FFF',
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  }
}

export function parseSortParameter(sortParam: string): Record<string, any> {
  const [fieldPath, order] = sortParam.split('.')
  const fields = fieldPath.split('_')

  return fields.reduceRight((acc, field, index, array) => {
    if (index === array.length - 1) {
      return { [field]: order }
    }
    return { [field]: acc }
  }, {} as Record<string, any>)
}

export function filterColumnPrisma({
  columnName,
  value,
}: {
  columnName: string
  value: string
}) {
  const [filterValue, filterVariety] = value?.split('.') ?? []

  switch (filterVariety) {
    case 'contains':
      return {
        [columnName]: {
          contains: filterValue,
        },
      }
    case 'does not contain':
      return {
        [columnName]: {
          not: {
            contains: filterValue,
          },
        },
      }
    case 'is':
      return {
        [columnName]: {
          equals: filterValue,
        },
      }
    case 'is not':
      return {
        [columnName]: {
          not: {
            equals: filterValue,
          },
        },
      }
    default:
      return {
        [columnName]: {
          contains: filterValue,
        },
      }
  }
}
