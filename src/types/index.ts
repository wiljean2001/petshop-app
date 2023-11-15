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
}

export type TextFieldConfig = {
  type: 'text' | 'email' | 'password' | 'tel' | 'time'
  name: string
  label: string
  placeholder: string
  description?: string
}
export type TextareaFieldConfig = {
  type: 'area'
  name: string
  label: string
  placeholder: string
  description?: string
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
}

export type DateFieldConfig = {
  type: 'date'
  name: string
  label: string
  description?: string
  withTime?: boolean
}

export type SelectFieldConfig = {
  type: 'select'
  name: string
  label: string
  isMultiple: boolean
  options: { label: string; value: string }[]
  description?: string
}
export type DynamicFieldConfig = {
  type: 'dynamic'
  name: string
  options: FieldConfig[]
}

export type FieldConfig =
  | TextFieldConfig
  | TextareaFieldConfig
  | NumberFieldConfig
  | DateFieldConfig
  | SelectFieldConfig
  | DynamicFieldConfig
