import { DayModifiers } from 'react-day-picker'

export type IUserSession = {
  name: string
  email: string
  image?: string | null | undefined
  id?: string
  role?: string | undefined
  accessToken?: string | undefined
}

export type Option = {
  label: string
  value: string
  icon?: React.ComponentType<{ className?: string }>
}

export interface DataTableFilterOption<TData> {
  label: string
  value: keyof TData | string
  items: Option[]
  isAdvanced?: boolean
}

export interface DataTableSearchableColumn<TData> {
  id: keyof TData
  title: string
}

export interface DataTableFilterableColumn<TData>
  extends DataTableSearchableColumn<TData> {
  options: Option[]
}

export interface ButtonConfig {
  title: string
  onClick?: () => void
  className?: string
  type?: 'button' | 'reset' | 'submit' | undefined
}

export type TextFieldConfig = {
  type: 'text' | 'email' | 'password' | 'tel' | 'time'
  name: string
  label: string
  placeholder: string
  description?: string
  isDisabled?: boolean
  isAutoFocus?: boolean
  requiredBy?: string //
}
export type TextareaFieldConfig = {
  type: 'area'
  name: string
  label: string
  placeholder: string
  description?: string
  isDisabled?: boolean
  isAutoFocus?: boolean
  requiredBy?: string //
}
export type NumberFieldConfig = {
  type: 'number'
  name: string
  min: string | number
  max: string | number
  step: string
  label: string
  placeholder: string
  description?: string
  isDisabled?: boolean
  isAutoFocus?: boolean
  requiredBy?: string //
}

export type DateFieldConfig = {
  type: 'date'
  name: string
  label: string
  description?: string
  withTime?: boolean
  isDisabled?: boolean
  isAutoFocus?: boolean
  modifiers?: DayModifiers
  modifiersTimes?: {
    minTime: string
    maxTime: string
  }
  requiredBy?: string //
}

export type SelectFieldConfig = {
  type: 'select'
  name: string
  label: string
  isMultiple: boolean
  isDisabled?: boolean
  options: { label: string; value: string }[]
  description?: string
  isAutoFocus?: boolean
  requiredBy?: string //
}
export type RadioFieldConfig = {
  type: 'radio'
  name: string
  label: string
  isDisabled?: boolean
  description?: string
  isAutoFocus?: boolean
  requiredBy?: string //
}
export type optionsForDynamicField = {
  id: string
  config: FieldConfig[]
}
export type DynamicFieldConfig = {
  type: 'dynamic'
  name: string
  withButtons: boolean
  options: optionsForDynamicField[]
}

export type FieldConfig =
  | TextFieldConfig
  | TextareaFieldConfig
  | NumberFieldConfig
  | DateFieldConfig
  | SelectFieldConfig
  | RadioFieldConfig
  | DynamicFieldConfig

/**
 *
 */
export type DateComponents = {
  year: number
  month: number
  mouthLong: string
  mouthShort: string
  day: number
  weekdayLong: string
  weekdayShort: string
  hour: string
  minute: string
  second: string
  dayOfWeek: number
}

/**
 *
 */
export type DateToStringResult = {
  error?: string
  formattedDate?: string
  components?: DateComponents
}

export type IOwnerFilter = {
  id: string
  name: string
  surname: string
  Pet: IPetFilter[]
}

export type IPetFilter = {
  id: string
  name: string
  breed: {
    name: string
    specie: {
      name: string
    } | null
  }
}

export interface MedicalRecord {
  id: string
  name: string
  birthdate?: Date
  gender: string
  color: string
  medicalNotes?: string
  breed: {
    id: string
    name: string
    specie?: {
      id: string
      name: string
    } | null
  }
  Appointments: Array<{
    id: string
    scheduledDateTime: Date
    beginningDateTime?: Date
    status: string
    veterinarian: {
      id: string
      name: string
      surname: string
      specialty: string
      email?: string
    }
    ServiceAppointments: Array<{
      id: string
      date: Date
      details: string
      cost: number
      service: {
        id: string
        name: string
        description: string
      }
      clinicalData?: {
        id: string
        registrationDate: Date
        weight?: number
        height?: number
        temperature?: number
        vitalSigns?: string
        extras?: string
      } | null
    }>
    Attendances: {
      id: string
      date: Date
      Diagnostics: {
        id: string
        description: string
        diagnosisDate: Date
        status: string
      } | null
      Prescription?: {
        id: string
        emissionDate: Date
        instructions: string
        prescribedItem: Array<{
          id: string
          type: string
          description: string
          dosage?: string
          instructions: string
          startDate: Date
          endDate: Date
        }>
      }
    }
  }>
}
