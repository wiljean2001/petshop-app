import { redirect } from 'next/navigation'
import { db } from '@/lib/prisma'
import { EmptyPlaceholder } from '@/components/empty-placeholder'
import { DashboardHeader } from '@/components/layout/auth/header'
// import { PostCreateButton } from '@/components/post-create-button'
import { PostItem } from '@/components/post-item'
import { DashboardShell } from '@/components/shell'
import { getCurrentUser } from '@/helpers/get-server-session'
import { Button } from '@/components/ui/button'

export const metadata = {
  title: 'Dashboard',
}

export default async function AdminPage() {
  // const user = await getCurrentUser()

  // if (!user || user.role === 'user') {
  //   redirect('/login')
  // }

  const posts = await db.pet.findMany({
    // where: {
    //   authorId: user.id,
    // },
    // select: {
    //   id: true,
    //   title: true,
    //   published: true,
    //   createdAt: true,
    // },
    orderBy: {
      updatedAt: 'desc',
    },
  })

  return (
    <DashboardShell>
      <h3>...En desarrollo</h3>
      {/* <DashboardHeader heading='' text=''>
        <PostCreateButton />
        <Button>Dashboard</Button>
      </DashboardHeader> */}
      {/* <div>
        {posts?.length ? (
          <div className='divide-y divide-border rounded-md border'>
            {posts.map((post) => (
              <PostItem key={post.id} pet={post} />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name='post' />
            <EmptyPlaceholder.Title>No posts created</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any posts yet. Start creating content.
            </EmptyPlaceholder.Description>
            {/* <PostCreateButton variant='outline' /> */}
      {/* <Button >PostCreateButton</Button>
          </EmptyPlaceholder>
        )}
      </div> */}
    </DashboardShell>
  )
}
