import { dateFormat } from '@/config/const'

export function getDateToString({
    date,
    locales = 'es',
    dateFormate: dateFormate = dateFormat,
  }: {
    date: Date
    locales?: string
    dateFormate?: Intl.DateTimeFormatOptions
  }) {
    return new Intl.DateTimeFormat(locales, dateFormate).format(date)
  }