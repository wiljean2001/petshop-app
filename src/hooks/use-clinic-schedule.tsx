import { showToast } from '@/helpers/toast'
import { getSchedulesByClinic } from '@/services/admin/schedules'
import { useEffect, useState } from 'react'

type DayOfWeek =
  | 'Domingo'
  | 'Lunes'
  | 'Martes'
  | 'Miércoles'
  | 'Jueves'
  | 'Viernes'
  | 'Sábado'

const daysOfWeekMap: Record<DayOfWeek, number> = {
  Domingo: 0,
  Lunes: 1,
  Martes: 2,
  Miércoles: 3,
  Jueves: 4,
  Viernes: 5,
  Sábado: 6,
}

/**
 * Convierte un texto de horario en un array de números representando los días de la semana.
 * Puede manejar rangos (p.ej., "Lunes a Viernes") o listas individuales de días (p.ej., "Lunes, Martes").
 *
 * @param {string} scheduleText - El texto del horario (p.ej., "Lunes a Viernes").
 * @returns {number[]} - Un array de índices de días de la semana (p.ej., [1, 2, 3, 4, 5]).
 */
function getDaysFromSchedule(scheduleText: string): number[] {
  // Verifica si el texto contiene un rango de días.
  if (scheduleText.includes(' a ')) {
    // Manejo de rango de días.
    const [startDay, endDay] = scheduleText
      .split(' a ')
      .map((day) => day.trim()) as [DayOfWeek, DayOfWeek]
    return getRangeOfDays(startDay, endDay)
  } else {
    // Manejo de lista de días individuales.
    const individualDays = scheduleText
      .split(',')
      .map((day) => day.trim()) as DayOfWeek[]
    return individualDays
      .map((day) => daysOfWeekMap[day])
      .filter((dayIndex) => dayIndex !== undefined)
  }
}

/**
 * Obtiene un rango de días entre dos días de la semana.
 *
 * @param {DayOfWeek} startDay - El día de inicio del rango.
 * @param {DayOfWeek} endDay - El día de fin del rango.
 * @returns {number[]} - Un array de índices de días de la semana para el rango dado.
 */
function getRangeOfDays(startDay: DayOfWeek, endDay: DayOfWeek): number[] {
  const days: number[] = []
  const startIndex = daysOfWeekMap[startDay]
  const endIndex = daysOfWeekMap[endDay]

  // Verifica si los días de inicio y fin son válidos.
  if (startIndex === undefined || endIndex === undefined) {
    return days
  }

  // Maneja el rango que cruza el fin de semana.
  if (startIndex > endIndex) {
    for (let i = startIndex; i <= 6; i++) days.push(i)
    for (let i = 0; i <= endIndex; i++) days.push(i)
  } else {
    for (let i = startIndex; i <= endIndex; i++) days.push(i)
  }

  return days
}

export function useClinicSchedule(clinic: string | undefined): {
  disabledDays: number[]
  enabledHours: {
    minTime?: string
    maxTime?: string
  }
} {
  const [disabledDays, setDisabledDays] = useState<number[]>([])
  const [enabledHours, setEnabledHours] = useState<{
    minTime?: string
    maxTime?: string
  }>({})

  useEffect(() => {
    if (clinic) {
      const fetchingSchedules = async () => {
        try {
          getSchedulesByClinic({ clinic: clinic! }).then((schedules) => {
            // Get all disables days
            const allDisabledDays = schedules
              .map((schedule) => getDaysFromSchedule(schedule.dayWeek))
              .flat()

            setDisabledDays(allDisabledDays)

            // Obtener todas las horas para habilitar
            const openingHours = schedules.map(
              (schedule) => schedule.openingHour!
            )
            const closingHours = schedules.map(
              (schedule) => schedule.closingHour!
            )
            // Encuentra la hora de apertura mínima y la hora de cierre máxima
            const minTime = Math.min(
              ...openingHours.map((time) => parseInt(time.replace(':', ''), 10))
            )
            const maxTime = Math.max(
              ...closingHours.map((time) => parseInt(time.replace(':', ''), 10))
            )

            // Asegúrate de que minTime y maxTime estén en un formato adecuado ('HH:MM')
            setEnabledHours({
              minTime: String(minTime).padStart(4, '0').replace(/(..)/, '$1:'),
              maxTime: String(maxTime).padStart(4, '0').replace(/(..)/, '$1:'),
            })
          })
        } catch (error) {
          showToast('Ocurrió un error cargar los horarios.', 'error')
        }
      }
      fetchingSchedules()
    } else {
      // Si no hay clínica seleccionada, establece los días deshabilitados a un estado inicial
      setDisabledDays([])
    }
  }, [clinic])

  return { disabledDays, enabledHours }
}
