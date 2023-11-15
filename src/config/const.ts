import cirujia_image from '@/img/cirujia.webp'
import consulta_image from '@/img/consulta_veterinaria.webp'
import vacunacion_image from '@/img/vacunaciones.webp'

export const SERVICES = [
  {
    src: consulta_image.src,
    title: 'Consultas veterinarias',
    description:
      'Ofrecemos consultas veterinarias especializadas para el cuidado de tu mascota.',
  },
  {
    src: vacunacion_image.src,
    title: 'Vacunaciones',
    description:
      'Mantén a tu mascota protegida y saludable con nuestras vacunas de calidad.',
  },
  {
    src: cirujia_image.src,
    title: 'Cirugías',
    description:
      'Contamos con un equipo de profesionales que realiza cirugías seguras y efectivas.',
  },
]

export const dateFormat: Intl.DateTimeFormatOptions = {
  weekday: 'short',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  hour12: true,
}
export const hourFormat: Intl.DateTimeFormatOptions = {
  hour: '2-digit',
  hour12: true,
}

export const QUERY_KEY = {
  user: 'user',
}

export enum OPTIONS_CRUD {
  CREATE,
  UPDATE,
  DELETE,
}

export const APPOINTMENTSTATUSTRANSLATIONS = {
  PENDING: 'Pendiente',
  CONFIRMED: 'Confirmada',
  IN_PROCESS: 'En Proceso',
  COMPLETED: 'Completada',
  CANCELED: 'Cancelada',
  NO_SHOW: 'No Presentado',
}

/**
 * 
 */
export type ServiceStatusKey = 'ACTIVE' | 'INACTIVE' | 'UNCONTINUED'
export const SERVICESTATUSTRANSLATIONS: Record<ServiceStatusKey, string> = {
  ACTIVE: 'Activo',
  INACTIVE: 'Inactivo',
  UNCONTINUED: 'Descontinuado',
}
