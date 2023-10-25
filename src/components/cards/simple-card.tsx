import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function SimpleCard({
  children,
  title,
}: {
  children?: React.ReactNode
  title: string
}) {
  return (
    <Card className=''>
      <CardHeader>
        {/* Title */}
        {/* <CardTitle className='text-2xl font-bold'>{title}</CardTitle> */}
        {/* Divider */}
        {/* <hr className="mt-5 pl-3 my-4 md:min-w-full" /> */}
      </CardHeader>
      {/* Content */}
      <CardContent>{children}</CardContent>
    </Card>
  )
}
