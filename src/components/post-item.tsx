import Link from 'next/link'

import { getDateToString } from '@/lib/times'
import { Skeleton } from '@/components/ui/skeleton'
// import { PostOperations } from "@/components/pet-operations"
import { IPet } from '@/models/schemas'

interface PostItemProps {
  pet: Pick<IPet, 'id' | 'name' | 'birthdate' | 'createdAt' | 'updatedAt'>
}

export function PostItem({ pet }: PostItemProps) {
  return (
    <div className='flex items-center justify-between p-4'>
      <div className='grid gap-1'>
        <Link
          href={`/editor/${pet.id}`}
          className='font-semibold hover:underline'
        >
          {pet.name}
        </Link>
        <div>
          <p className='text-sm text-muted-foreground'>
            {getDateToString({ date: pet.createdAt })}
          </p>
        </div>
      </div>
      {/* <PostOperations pet={{ id: pet.id, title: pet.title }} /> */}
    </div>
  )
}

PostItem.Skeleton = function PostItemSkeleton() {
  return (
    <div className='p-4'>
      <div className='space-y-3'>
        <Skeleton className='h-5 w-2/5' />
        <Skeleton className='h-4 w-4/5' />
      </div>
    </div>
  )
}
