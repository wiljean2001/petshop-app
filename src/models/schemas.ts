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
  number,
  enumType,
  isoTime,
  isoDate,
  isoDateTime,
} from './valibot'

export const idSchema = object({ id: string() })
//
export const ClinicSchema = object({
  id: optional(string()),
  name: string(),
  location: string(),
  image: nullable(string('Debes ingresar texto'), 'Campo Opcional'),
  phone: nullable(string()),
  createdAt: optional(date()),
  updatedAt: optional(date()),
})
export type IClinic = Input<typeof ClinicSchema>

//
export const ScheduleSchema = object({
  id: optional(string()),
  day_week: string('Dato requerido'),
  openingHour: nullable(string([isoTime('error')])),
  closingHour: nullable(string([isoTime('error')])),
  createdAt: optional(date()),
  updatedAt: optional(date()),
})
export type ISchedule = Input<typeof ScheduleSchema>

export const ClinicScheduleSchema = object({
  clinicId: string(),
  scheduleId: string(),
  clinic: ClinicSchema,
  schedule: ScheduleSchema,
})
export type IClinicSchedule = Input<typeof ClinicScheduleSchema>

//
export const VeterinarianSchema = object({
  id: optional(string()),
  name: string(),
  surname: string(),
  clinicId: nullable(string()),
  clinic: optional(nullable(ClinicSchema)),
  phone: string(),
  specialty: string(),
  email: nullable(string()),
  createdAt: optional(date()),
  updatedAt: optional(date()),
})
export type IVeterinarian = Input<typeof VeterinarianSchema>

export const FileSchema = object({
  id: optional(string()),
  name: string(),
  url: string(),
  key: string(),
  createdAt: optional(date()),
  updatedAt: optional(date()),
})
export type IFile = Input<typeof FileSchema>

export const SpecieSchema = object({
  id: optional(string()),
  name: string(),
  createdAt: optional(date()),
  updatedAt: optional(date()),
})
export type ISpecie = Input<typeof SpecieSchema>

export const BreedSchema = object({
  id: optional(string()),
  specieId: nullable(string()),
  name: string(),
  createdAt: optional(date()),
  updatedAt: optional(date()),
  specie: optional(nullable(SpecieSchema)),
})
export type IBreed = Input<typeof BreedSchema>

export const OwnerSchema = object({
  id: optional(string()),
  name: string(),
  surname: string(),
  city: nullable(string()),
  address: string(),
  phone: nullable(string()),
  email: nullable(string()),
  createdAt: optional(date()),
  updatedAt: optional(date()),
})
export type IOwner = Input<typeof OwnerSchema>

export const PetSchema = object({
  id: optional(string()),
  name: string(),
  birthdate: nullable(date('Formato incorrecto')),
  // birthdate: nullable(string([isoDateTime('Formato incorrecto')])),
  gender: string(),
  ownerId: string(),
  breedId: string(),
  createdAt: optional(date()),
  updatedAt: optional(date()),
  owner: optional(nullable(OwnerSchema)),
  breed: optional(nullable(BreedSchema)),
})
export type IPet = Input<typeof PetSchema>

export const ServiceSchema = object({
  id: optional(string()),
  name: string(),
  description: string(),
  cost: number(),
  duration: number(),
  state: enumType(['ACTIVO', 'INACTIVO', 'DESCONTINUADO']),
  details: optional(
    array(
      object({
        detailType: string(),
        value: string(),
      })
    )
  ),
  createdAt: optional(date()),
  updatedAt: optional(date()),
})
export type IService = Input<typeof ServiceSchema>

export const AppointmentSchema = object({
  id: optional(string()),
  petId: nullable(string()),
  vetId: nullable(string()),
  dateTime: optional(date()),
  status: enumType([
    'PENDING',
    'CONFIRMED',
    'IN_PROCESS',
    'COMPLETED',
    'CANCELED',
    'NO_SHOW',
  ]),
  createdAt: optional(date()),
  updatedAt: optional(date()),
  pet: optional(nullable(PetSchema)),
  veterinarian: optional(nullable(VeterinarianSchema)),
})
export type IAppointment = Input<typeof AppointmentSchema>

export const ServiceDetailSchema = object({
  id: optional(string()),
  serviceId: nullable(string()),
  detailType: string(),
  value: string(),
  createdAt: optional(date()),
  updatedAt: optional(date()),
  service: optional(nullable(ServiceSchema)),
})
export type IServiceDetail = Input<typeof ServiceDetailSchema>

// Asistencias
export const AttendanceSchema = object({
  id: optional(string()),
  appointmentId: nullable(string()),
  date: optional(date()),
  createdAt: optional(date()),
  updatedAt: optional(date()),
  appointment: optional(nullable(AppointmentSchema)),
})
export type IAttendance = Input<typeof AttendanceSchema>

export const ServiceAttentionSchema = object({
  id: optional(string()),
  attentionId: nullable(string()),
  serviceId: nullable(string()),
  date: optional(date()),
  details: string(),
  createdAt: optional(date()),
  updatedAt: optional(date()),
  attendance: optional(nullable(AttendanceSchema)),
  service: optional(nullable(ServiceSchema)),
})
export type IServiceAttention = Input<typeof ServiceAttentionSchema>

export const DiagnosticSchema = object({
  id: optional(string()),
  attendanceId: nullable(string()),
  description: string(),
  diagnosisDate: optional(date()),
  status: enumType(['RESOLVED', 'CHRONIC']),
  createdAt: optional(date()),
  updatedAt: optional(date()),
  attendance: optional(nullable(AttendanceSchema)),
})
export type IDiagnostic = Input<typeof VeterinarianSchema>

export const ClinicalDataSchema = object({
  id: optional(string()),
  serviceAttentionId: nullable(string()),
  registrationDate: optional(date()),
  weight: number(),
  height: number(),
  temperature: number(),
  vitalSigns: string(),
  extras: string(),
  createdAt: optional(date()),
  updatedAt: optional(date()),
  serviceAttention: optional(nullable(ServiceAttentionSchema)),
})
export type IClinicalData = Input<typeof ClinicalDataSchema>

export const PrescriptionSchema = object({
  id: optional(string()),
  attendanceId: nullable(string()),
  emissionDate: optional(date()),
  instructions: string(),
  createdAt: optional(date()),
  updatedAt: optional(date()),
  attendance: optional(nullable(AttendanceSchema)),
})
export type IPrescription = Input<typeof PrescriptionSchema>

export const PrescribedItemSchema = object({
  id: optional(string()),
  prescriptionId: nullable(string()),
  type: enumType(['MEDICATION', 'DIET', 'RECOMMENDATION', 'OTHER']),
  description: string(),
  dosage: string(),
  instructions: string(),
  startDate: optional(date()),
  endDate: optional(date()),
  createdAt: optional(date()),
  updatedAt: optional(date()),
  prescription: optional(nullable(PrescriptionSchema)),
})
export type IPrescribedItem = Input<typeof PrescribedItemSchema>
