import { format, isValid, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'
import { DateComponents, DateToStringResult } from '@/types'
import { utcToZonedTime, zonedTimeToUtc, format as tzFormat } from 'date-fns-tz'

export const dateFormat: string = 'EEEE, d MMMM yyyy hh:mm aaaa'
function isValidDate(date: Date | string | number) {
  if (typeof date === 'string' || typeof date === 'number') {
    date = new Date(date)
  }
  return isValid(date)
}
// // const timeZone = 'UTC '
function getDateComponents(
  date: Date | string | number,
  timeZone: string = 'America/Lima',
  locales: string = 'es'
): DateComponents {
  let dateObj: Date

  if (typeof date === 'string' || typeof date === 'number') {
    dateObj = new Date(date)
  } else {
    dateObj = date
  }

  const zonedDate = utcToZonedTime(dateObj, timeZone)

  return {
    year: zonedDate.getFullYear(),
    month: zonedDate.getMonth() + 1,
    mouthLong: tzFormat(zonedDate, 'MMMM', { locale: es, timeZone }),
    mouthShort: tzFormat(zonedDate, 'MMM', { locale: es, timeZone }),
    day: zonedDate.getDate(),
    weekdayLong: tzFormat(zonedDate, 'EEEE', { locale: es, timeZone }),
    weekdayShort: tzFormat(zonedDate, 'EEE', { locale: es, timeZone }),
    hour: tzFormat(zonedDate, 'hh', { locale: es, timeZone }),
    minute: tzFormat(zonedDate, 'mm aaaa', { locale: es, timeZone }),
    second: tzFormat(zonedDate, 'ss', { locale: es, timeZone }),
    dayOfWeek: zonedDate.getDay(),
  }
}

export function getDateToString({
  date,
  timeZone = 'America/Lima',
  // timeZone = 'UTC',
  locales = 'es',
  dateFormatOption = dateFormat,
}: {
  date?: Date | string | number
  timeZone?: string
  locales?: string
  dateFormatOption?: string
}): DateToStringResult {
  if (!date) return { error: 'Sin fecha' }

  if (!isValidDate(date)) return { error: 'Fecha inválida' }

  let dateObj: Date

  if (typeof date === 'string' || typeof date === 'number') {
    dateObj = new Date(date)
  } else {
    dateObj = date
  }

  const zonedDate = utcToZonedTime(dateObj, timeZone)

  const formattedDate = tzFormat(zonedDate, dateFormatOption, {
    locale: es,
    timeZone,
  })

  return {
    formattedDate,
    components: getDateComponents(date, timeZone, locales),
  }
}
