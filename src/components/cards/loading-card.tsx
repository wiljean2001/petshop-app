import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function LoadingSimpleCard() {
  return (
    <Card>
      <CardHeader>
        {/* Title */}
        <CardTitle className="text-2xl font-bold">
          <Skeleton className="w-[100px] h-[30px]" />
        </CardTitle>
      </CardHeader>
      {/* Content */}
      <CardContent>
        <Skeleton className="w-full h-[300px]" />
      </CardContent>
    </Card>
  )
}
