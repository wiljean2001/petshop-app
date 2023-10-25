import 'server-only'

import type { Locale } from '@/config/i18n.config'

const dictionaries = {
  es: () => import('@/dictionaries/es.json').then((module) => module.default),
}

export const getDictionary = async (locale: Locale) => dictionaries[locale]()
