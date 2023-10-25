export type IUserSession = {
  name: string
  email: string
  image?: string | null | undefined
  id?: string | undefined
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
