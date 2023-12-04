import { AppointmentStatusKey } from '@/config/const'
import {
  string,
  object,
  optional,
  email,
  date,
  Input,
  array,
  minLength,
  nullable,
  boolean,
  any,
  number,
  enumType,
  recursive,
  recursiveAsync,
  BaseSchema,
  isoTime,
  isoDate,
  isoDateTime,
} from './valibot'
// Schema for schedule
export const ScheduleSchema = object({
  id: optional(string('')), // Optional ID, error message if not a string
  dayWeek: string('Dato requerido'), // Day of the week required
  openingHour: nullable(string([isoTime('Hora de apertura inválida')])), // Opening hour, null or in ISO format
  closingHour: nullable(string([isoTime('Hora de cierre inválida')])), // Closing hour, null or in ISO format
  createdAt: optional(date('Fecha de creación inválida')), // Optional creation date
  updatedAt: optional(date('Fecha de actualización inválida')), // Optional update date
})
export type ISchedule = Input<typeof ScheduleSchema>

// Schema for clinic schedule
export const ClinicScheduleSchema = object({
  schedule: ScheduleSchema, // Schedule using Schedule schema
})
export type IClinicScheduleSchema = Input<typeof ClinicScheduleSchema>

// Schema for a clinic
export const ClinicSchema = object({
  id: optional(string('')), // Optional ID, error message if not a string
  name: string('Nombre requerido'), // Clinic name required
  location: string('Ubicación requerida'), // Clinic location required
  image: nullable(string('Debes ingresar texto'), 'Campo Opcional'), // Optional image, null or string
  phone: nullable(string('Número de teléfono inválido')), // Optional phone number, null or string
  scheduleIds: optional(array(string('ID de horario inválido'))), // Optional array of schedule IDs
  ClinicSchedule: optional(array(ClinicScheduleSchema)), // Optional array of ClinicSchedule
  createdAt: optional(date('Fecha de creación inválida')), // Optional creation date
  updatedAt: optional(date('Fecha de actualización inválida')), // Optional update date
})
export type IClinic = Input<typeof ClinicSchema>

// Schema for a veterinarian
export const VeterinarianSchema = object({
  id: optional(string('')), // Optional ID, error message if not a string
  name: string('Nombre requerido'), // Veterinarian's name required
  surname: string('Apellido requerido'), // Veterinarian's surname required
  clinicId: string('ID de clínica requerido'), // Clinic ID required
  clinic: optional(nullable(ClinicSchema)), // Optional, nullable Clinic schema
  phone: string('Número de teléfono requerido'), // Phone number required
  specialty: string('Especialidad requerida'), // Specialty required
  email: nullable(string('Correo electrónico inválido')), // Optional email, null or string
  createdAt: optional(date('Fecha de creación inválida')), // Optional creation date
  updatedAt: optional(date('Fecha de actualización inválida')), // Optional update date
})
export type IVeterinarian = Input<typeof VeterinarianSchema>

// Schema for a file
export const FileSchema = object({
  id: optional(string('')), // Optional ID, error message if not a string
  name: string('Nombre del archivo requerido'), // File name required
  url: string('URL del archivo requerida'), // File URL required
  key: string('Clave del archivo requerida'), // File key required
  createdAt: optional(date('Fecha de creación inválida')), // Optional creation date
  updatedAt: optional(date('Fecha de actualización inválida')), // Optional update date
})
export type IFile = Input<typeof FileSchema>

// Schema for a species
export const SpecieSchema = object({
  id: optional(string('')), // Optional ID, error message if not a string
  name: string('Nombre de la especie requerido'), // Species name required
  createdAt: optional(date('Fecha de creación inválida')), // Optional creation date
  updatedAt: optional(date('Fecha de actualización inválida')), // Optional update date
})
export type ISpecie = Input<typeof SpecieSchema>

// Schema for a breed
export const BreedSchema = object({
  id: optional(string('')), // Optional ID, error message if not a string
  specieId: nullable(string('ID de especie inválido')), // Optional species ID, null or string
  name: string('Nombre de la raza requerido'), // Breed name required
  createdAt: optional(date('Fecha de creación inválida')), // Optional creation date
  updatedAt: optional(date('Fecha de actualización inválida')), // Optional update date
  specie: optional(nullable(SpecieSchema)), // Optional, nullable Species schema
})
export type IBreed = Input<typeof BreedSchema>
// Schema for pet owner
export const OwnerSchema = object({
  id: optional(string('')), // Optional ID, error message if not a string
  name: string('Nombre requerido'), // Owner's name required
  surname: string('Apellido requerido'), // Owner's surname required
  city: nullable(string('Ciudad inválida')), // Optional city, null or string
  address: string('Dirección requerida'), // Address required
  userId: optional(string('')),
  phone: nullable(string('Número de teléfono inválido')), // Optional phone number, null or string
  email: nullable(string('Correo electrónico inválido')), // Optional email, null or string
  createdAt: optional(date('Fecha de creación inválida')), // Optional creation date
  updatedAt: optional(date('Fecha de actualización inválida')), // Optional update date
})
export type IOwner = Input<typeof OwnerSchema>

// Schema for pets
export const PetSchema = object({
  id: optional(string('')), // Optional ID, error message if not a string
  name: string('Nombre requerido'), // Pet's name required
  birthdate: nullable(date('Formato incorrecto')), // Optional birthdate, null or in date format
  gender: string('Género requerido'), // Gender required
  color: string('Color requerido'), // Color required
  medicalNotes: optional(nullable(string('Notas médicas inválidas'))), // Optional medical notes, null or string
  derivedFrom: optional(nullable(string('Origen inválido'))), // Optional derived from, null or string
  ownerId: string('ID del dueño requerido'), // Owner's ID required
  breedId: string('ID de la raza requerido'), // Breed's ID required
  createdAt: optional(date('Fecha de creación inválida')), // Optional creation date
  updatedAt: optional(date('Fecha de actualización inválida')), // Optional update date
  owner: optional(nullable(OwnerSchema)), // Optional owner, null or using Owner schema
  breed: optional(nullable(BreedSchema)), // Optional breed, null or using Breed schema
})
export type IPet = Input<typeof PetSchema>

// Schema for service details
export const ServiceDetailSchema = object({
  id: optional(string('')), // Optional ID, error message if not a string
  serviceId: optional(string('ID del servicio inválido')), // Optional service ID
  detailType: string('Tipo de detalle requerido'), // Detail type required
  value: string('Valor requerido'), // Value required
  createdAt: optional(date('Fecha de creación inválida')), // Optional creation date
  updatedAt: optional(date('Fecha de actualización inválida')), // Optional update date
})
export type IServiceDetail = Input<typeof ServiceDetailSchema>

// Schema for services
export const ServiceSchema = object({
  id: optional(string('')), // Optional ID, error message if not a string
  name: string('Nombre del servicio requerido'), // Service name required
  description: string('Descripción requerida'), // Description required
  cost: number('Costo requerido'), // Cost required
  duration: number('Duración requerida'), // Duration required
  state: enumType(['ACTIVE', 'INACTIVE', 'UNCONTINUED']), // Service state enumeration
  requiresClinicalData: optional(boolean('Dato clínico requerido')), // Optional clinical data requirement boolean
  ServiceDetails: optional(array(ServiceDetailSchema)), // Optional array of ServiceDetails
  createdAt: optional(date('Fecha de creación inválida')), // Optional creation date
  updatedAt: optional(date('Fecha de actualización inválida')), // Optional update date
})
export type IService = Input<typeof ServiceSchema>

// Schema for clinical data
export const ClinicalDataSchema = object({
  id: optional(string('')), // Optional ID, error message if not a string
  weight: number('Peso requerido'), // Weight required
  height: number('Altura requerida'), // Height required
  temperature: number('Temperatura requerida'), // Temperature required
  vitalSigns: string('Signos vitales requeridos'), // Vital signs required
  extras: optional(string('Información adicional inválida')), // Optional extras, null or string
})
export type IClinicalData = Input<typeof ClinicalDataSchema>

export interface Appointments {
  pet: {
    name: string
    owner: {
      name: string
      surname: string
    }
    breed: {
      name: string
      specie: {
        name: string
      } | null
    }
  }
  id: string
  scheduledDateTime: Date
  beginningDateTime?: Date
  status: AppointmentStatusKey
}
/**
 *
 */
// Schema for an appointment with services
export const AppointmentWithServiceSchema = object({
  petId: string('ID de mascota requerido'), // Pet ID required
  vetId: string('ID de veterinario requerido'), // Vet ID required
  scheduledDateTime: date('Fecha y hora programadas inválidas'), // Scheduled date and time required
  beginningDateTime: optional(date('Fecha y hora de inicio inválidas')), // Optional beginning date and time
  status: enumType([
    'PENDING',
    'CONFIRMED',
    'IN_PROCESS',
    'COMPLETED',
    'CANCELED',
    'NO_SHOW',
  ]), // Appointment status enumeration
  services: array(
    object({
      cost: number('Costo requerido'), // Cost required
      details: string('Detalles requeridos'), // Details required
      serviceId: string('ID del servicio requerido'), // Service ID required
      // requiresClinicalData: optional(
      //   nullable(boolean('Dato clínico requerido'))
      // ), // Clinical data requirement boolean
    })
  ), // Array of services
})
export type IAppointmentWithService = Input<typeof AppointmentWithServiceSchema>

// Schema for appointment update only
export const AppointmentOnlyUpdateSchema = object({
  id: optional(string('')), // Optional ID, error message if not a string
  clinicId: optional(string('ID de clínica inválido')), // Optional clinic ID
  scheduledDateTime: date('Fecha y hora programadas inválidas'), // Scheduled date and time required
  status: enumType([
    'PENDING',
    'CONFIRMED',
    'IN_PROCESS',
    'COMPLETED',
    'CANCELED',
    'NO_SHOW',
  ]), // Appointment status enumeration
})
export type IAppointmentOnlyUpdate = Input<typeof AppointmentOnlyUpdateSchema>

// Schema for service appointments
export const ServiceAppointmentSchema = object({
  id: optional(string('')), // Optional ID, error message if not a string
  serviceId: optional(string('ID del servicio inválido')), // Optional service ID
  cost: number('Costo requerido'), // Cost required
  details: string('Detalles requeridos'), // Details required
  clinicalData: optional(ClinicalDataSchema), // Clinical data using ClinicalDataSchema
  createdAt: optional(date('Fecha de creación inválida')), // Optional creation date
  updatedAt: optional(date('Fecha de actualización inválida')), // Optional update date
})
export type IServiceAppointment = Input<typeof ServiceAppointmentSchema>

// Array schema for service appointments
export const ServiceAppointmentArraySchema = object({
  services: array(ServiceAppointmentSchema), // Array of service appointments
  dateTime: optional(date('Fecha invalida')),
  appointmentId: optional(string()),
})
export type IServiceAppointmentArray = Input<
  typeof ServiceAppointmentArraySchema
>

// Schema for appointments
export const AppointmentSchema = object({
  id: optional(string('')), // Optional ID, error message if not a string
  petId: string('ID de mascota requerido'), // Pet ID required
  vetId: string('ID de veterinario requerido'), // Vet ID required
  scheduledDateTime: date('Fecha y hora programadas inválidas'), // Scheduled date and time required
  beginningDateTime: optional(date('Fecha y hora de inicio inválidas')), // Optional beginning date and time
  status: enumType([
    'PENDING',
    'CONFIRMED',
    'IN_PROCESS',
    'COMPLETED',
    'CANCELED',
    'NO_SHOW',
  ]), // Appointment status enumeration
  ServiceAppointments: array(ServiceAppointmentSchema), // Array of service appointments
  Attendances: optional(
    object({
      id: optional(string()),
      Diagnostics: recursive(() => DiagnosticSchema),
      Prescription: recursive(() => PrescriptionSchema),
    })
  ),
  createdAt: optional(date('Fecha de creación inválida')), // Optional creation date
  updatedAt: optional(date('Fecha de actualización inválida')), // Optional update date
  pet: optional(PetSchema), // Optional pet schema
  veterinarian: optional(VeterinarianSchema), // Optional veterinarian schema
})
export type IAppointment = Input<typeof AppointmentSchema>

export type Appointment = {
  scheduledDateTime: Date
  status: string
  veterinarian: {
    name: string
    surname: string
    specialty: string
  }
  pet: {
    name: string
    breed: {
      name: string
    }
    owner: {
      name: string
      surname: string
    }
  }
}

export type Attendance = {
  id?: string
  date: Date
  appointment: Appointment
  createdAt: Date
  updatedAt: Date
}
// Schema for attendances
export const AttendanceSchema = object({
  id: optional(string('')), // Optional ID, error message if not a string
  appointmentId: string('ID de cita requerido'), // Appointment ID required
  date: date('Fecha inválida'), // Date required
  createdAt: optional(date('Fecha de creación inválida')), // Optional creation date
  updatedAt: optional(date('Fecha de actualización inválida')), // Optional update date
  appointment: optional(nullable(AppointmentSchema)), // Optional appointment, nullable
})
export type IAttendance = Input<typeof AttendanceSchema>

// Schema for diagnostics
export const DiagnosticSchema = object({
  id: optional(string('')), // Optional ID, error message if not a string
  attendanceId: optional(string('ID de asistencia inválido')), // Optional attendance ID, nullable
  description: string('Descripción requerida'), // Description required
  diagnosisDate: optional(date('Fecha de diagnóstico inválida')), // Optional diagnosis date
  status: enumType(['RESOLVED', 'TREATMENT']), // Diagnostic status enumeration
  createdAt: optional(date('Fecha de creación inválida')), // Optional creation date
  updatedAt: optional(date('Fecha de actualización inválida')), // Optional update date
  attendance: optional(nullable(AttendanceSchema)), // Optional attendance, nullable
})
export type IDiagnostic = Input<typeof DiagnosticSchema>

// Schema for prescribed items
export const PrescribedItemSchema = object({
  id: optional(string('')), // Optional ID, error message if not a string
  type: enumType(['MEDICATION', 'DIET', 'RECOMMENDATION', 'OTHER']), // Prescribed item type enumeration
  description: string('Descripción requerida'), // Description required
  dosage: string('Dosificación requerida'), // Dosage required
  instructions: string('Instrucciones requeridas'), // Instructions required
  startDate: date('Fecha de inicio inválida'), // Optional start date
  endDate: date('Fecha de fin inválida'), // Optional end date
  createdAt: optional(date('Fecha de creación inválida')), // Optional creation date
  updatedAt: optional(date('Fecha de actualización inválida')), // Optional update date
})
export type IPrescribedItem = Input<typeof PrescribedItemSchema>

// Schema for prescriptions
export const PrescriptionSchema = object({
  id: optional(string('')), // Optional ID, error message if not a string
  attendanceId: optional(string('ID de asistencia inválido')), // Optional attendance ID, nullable
  emissionDate: optional(date('Fecha de emisión inválida')), // Optional emission date
  instructions: string('Instrucciones requeridas'), // Instructions required
  prescribedItem: array(PrescribedItemSchema), // Array of prescribed items
  createdAt: optional(date('Fecha de creación inválida')), // Optional creation date
  updatedAt: optional(date('Fecha de actualización inválida')), // Optional update date
  attendance: optional(nullable(AttendanceSchema)), // Optional attendance, nullable
})
export type IPrescription = Input<typeof PrescriptionSchema>

// export const


