// import { siteConfig } from '@/config/site'
// import { IUserRestrict } from '@/models/user'

// export async function getUsers() {
//   const res = await fetch(`${siteConfig.url}/api/admin/users/`, {
//     method: 'GET',
//     headers: { 'Content-Type': 'application/json' },
//     // cache: 'no-cache',
//   })

//   if (!res.ok) {
//     throw new Error(`Fallo en la obtención de los usuarios: ${res.statusText}`)
//   }

//   const users: IUserRestrict[] = await res.json()

//   return users
// }
