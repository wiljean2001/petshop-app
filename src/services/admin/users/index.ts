import { siteConfig } from '@/config/site'
import { IUserRestrict } from '@/models/user'

export async function getUsers() {
    const res = await fetch(`${siteConfig.url}/api/admin/users/`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
  
    if (!res.ok) {
      throw new Error(
        `Fallo en la crreación|eliminación|actualización de la especie: ${res.statusText}`
      )
    }
  
    const specie: IUserRestrict[] = await res.json()
  
    return specie
  }