// helper.js
import { authOptions } from '@/lib/next-auth/options'
import { getServerSession } from 'next-auth/next'
/**
 *
 * @returns getServerSession: get server session from next auth
 */
export async function getSSession() {
  return await getServerSession(authOptions)
}
