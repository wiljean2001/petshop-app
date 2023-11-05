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
} from './valibot'

// ! TODO: Add comments for all validations
// email('Email invalido')
export const LoginFormSchema = object({
  email: string([email('Email invalido')]),
  password: string([minLength(8, 'Contraseña debe tener más de 8 caracteres')]),
  // remember: optional(boolean()),
})
export type ILoginForm = Input<typeof LoginFormSchema>

export const SignUpSchema = object({
  email: string([email('Email invalido')]),
  password: string([minLength(8, 'Contraseña debe tener más de 8 caracteres')]),
  name: optional(string([minLength(2, 'Nombre invalido')])),
})
/**
 *
 */
export type ISingUpForm = Input<typeof SignUpSchema>

export const PermissionSchema = object({
  id: optional(string()),
  name: string(),
  created_at: optional(date()),
  updated_at: optional(date()),
})

export const RoleSchema = object({
  id: optional(string()),
  name: string(),
  created_at: optional(date()),
  updated_at: optional(date()),
})
export type IRole = Input<typeof RoleSchema>

export const RolePermission = object({
  roleId: string(),
  permissionId: string(),
})

//

// User schemas for validations
export const UserSchema = object({
  id: optional(string()),
  name: string(),
  email: string(),
  emailVerified: nullable(optional(string())),
  password: nullable(optional(string())),
  image: nullable(optional(string())),
  roleId: string(),
  role: RoleSchema,
  created_at: optional(date()),
  updated_at: optional(date()),
})
// User schemas for validations with restrictions
export const UserRestrictSchema = object({
  id: optional(string()),
  name: string(),
  email: string(),
  role: RoleSchema,
  createdAt: optional(date()),
  updatedAt: optional(date()),
})

export type IUser = Input<typeof UserSchema>
export type IUserRestrict = Input<typeof UserRestrictSchema>
export const IUserArraySchema = array(UserSchema)
