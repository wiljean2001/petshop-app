import { dateFormat } from '@/config/const'

export function getDateToString({
  date,
  locales = 'es',
  dateFormate: dateFormate = dateFormat,
}: {
  date?: Date | number
  locales?: string
  dateFormate?: Intl.DateTimeFormatOptions
}): string {
  if (!date) return 'Sin fecha'

  return new Intl.DateTimeFormat(locales, dateFormate).format(date)
}
