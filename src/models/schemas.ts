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
} from './valibot'
import { Role } from '@prisma/client'

//
export const ClinicSchema = object({
  id: optional(string()),
  name: string(),
  location: string(),
  image: optional(nullable(string())),
  phone: optional(nullable(string())),
  createdAt: optional(date()),
  updatedAt: optional(date()),
})
export type IClinic = Input<typeof ClinicSchema>

//
export const ScheduleSchema = object({
  id: optional(string()),
  day_week: string(),
  openingHour: string(),
  closingHour: optional(nullable(string())),
  clinicId: optional(nullable(string())),
  clinic: optional(nullable(ClinicSchema)),
  createdAt: optional(date()),
  updatedAt: optional(date()),
})
export type ISchedule = Input<typeof ScheduleSchema>

//
export type IRole = Role

//
export const VeterinarianSchema = object({
  id: optional(string()),
  name: string(),
  surname: string(),
  clinicId: optional(nullable(string())),
  clinic: optional(nullable(ClinicSchema)),
  phone: string(),
  specialty: string(),
  email: nullable(string()),
  createdAt: optional(date()),
  updatedAt: optional(date()),
})
export type IVeterinarian = Input<typeof VeterinarianSchema>
