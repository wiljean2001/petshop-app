// helper.js

import { auth } from '@/lib/next-auth/options'

/**
 *
 * @returns getServerSession: get user signed from next auth
 */
export async function getCurrentUser() {
  const session = await auth()

  return session?.user
}
