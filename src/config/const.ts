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
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  hour12: true,
}

export const hourFormat: Intl.DateTimeFormatOptions = {
  hour: '2-digit',
  minute: '2-digit',
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

export type AppointmentStatusKey =
  | 'PENDING'
  | 'CONFIRMED'
  | 'IN_PROCESS'
  | 'COMPLETED'
  | 'CANCELED'
  | 'NO_SHOW'

export const APPOINTMENTSTATUSTRANSLATIONS = {
  PENDING: 'Pendiente',
  CONFIRMED: 'Confirmada',
  IN_PROCESS: 'En proceso',
  COMPLETED: 'Completada',
  CANCELED: 'Cancelada',
  NO_SHOW: 'No asistió',
}
export const AppointmentStatusOptions = [
  { value: 'PENDING', label: APPOINTMENTSTATUSTRANSLATIONS['PENDING'] },
  { value: 'CONFIRMED', label: APPOINTMENTSTATUSTRANSLATIONS['CONFIRMED'] },
  { value: 'IN_PROCESS', label: APPOINTMENTSTATUSTRANSLATIONS['IN_PROCESS'] },
  { value: 'COMPLETED', label: APPOINTMENTSTATUSTRANSLATIONS['COMPLETED'] },
  { value: 'CANCELED', label: APPOINTMENTSTATUSTRANSLATIONS['CANCELED'] },
  { value: 'NO_SHOW', label: APPOINTMENTSTATUSTRANSLATIONS['NO_SHOW'] },
]

/**
 *
 */
export type ServiceStatusKey = 'ACTIVE' | 'INACTIVE' | 'UNCONTINUED'
export const SERVICESTATUSTRANSLATIONS: Record<ServiceStatusKey, string> = {
  ACTIVE: 'Activo',
  INACTIVE: 'Inactivo',
  UNCONTINUED: 'Descontinuado',
}

export const ServiceStatusOptions = [
  { value: 'ACTIVE', label: SERVICESTATUSTRANSLATIONS['ACTIVE'] },
  { value: 'INACTIVE', label: SERVICESTATUSTRANSLATIONS['INACTIVE'] },
  { value: 'UNCONTINUED', label: SERVICESTATUSTRANSLATIONS['UNCONTINUED'] },
]

/**
 *
 */
export type DiagnosticStatusKey = 'RESOLVED' | 'TREATMENT'
export const DIAGNOSTICSTATUSTRANSLATIONS: Record<DiagnosticStatusKey, string> =
  {
    RESOLVED: 'Resuelto',
    TREATMENT: 'Tratamiento',
  }
export const DiagnosticStatusOptions = [
  { value: 'RESOLVED', label: DIAGNOSTICSTATUSTRANSLATIONS['RESOLVED'] },
  { value: 'TREATMENT', label: DIAGNOSTICSTATUSTRANSLATIONS['TREATMENT'] },
]
/**
 *
 */
export type PrescriptionItemTypeKey =
  | 'MEDICATION'
  | 'DIET'
  | 'RECOMMENDATION'
  | 'OTHER'
export const PRESCRIPTIONITEMTYPETRANSLATIONS: Record<
  PrescriptionItemTypeKey,
  string
> = {
  MEDICATION: 'Medicación',
  DIET: 'Dienta',
  RECOMMENDATION: 'Recomendaciones',
  OTHER: 'Otros',
}
export const PrescriptionItemTypeOptions = [
  {
    value: 'MEDICATION',
    label: PRESCRIPTIONITEMTYPETRANSLATIONS['MEDICATION'],
  },
  { value: 'DIET', label: PRESCRIPTIONITEMTYPETRANSLATIONS['DIET'] },
  {
    value: 'RECOMMENDATION',
    label: PRESCRIPTIONITEMTYPETRANSLATIONS['RECOMMENDATION'],
  },
  { value: 'OTHER', label: PRESCRIPTIONITEMTYPETRANSLATIONS['OTHER'] },
]
