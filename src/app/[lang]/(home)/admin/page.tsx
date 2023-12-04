import { redirect } from 'next/navigation'
import { db } from '@/lib/prisma'
import { EmptyPlaceholder } from '@/components/empty-placeholder'
import { DashboardHeader } from '@/components/layout/auth/header'
// import { PostCreateButton } from '@/components/post-create-button'
import { DashboardShell } from '@/components/shell'
import { getCurrentUser } from '@/helpers/get-server-session'
import { Button } from '@/components/ui/button'
import { StatsCard } from '@/components/cards/dashboard/stats-card'
import { LineChart } from '@/components/cards/dashboard/line-chart'
import { BarChart } from '@/components/cards/dashboard/bar-chart'
import { PieChart } from '@/components/cards/dashboard/pie-chart'

export const metadata = {
  title: 'Dashboard',
}

export default async function AdminPage() {
  // Fetching data using Prisma based on your models
  const totalAppointments = db.appointments.count()
  const activeServices = db.service.count({
    where: { state: 'ACTIVE' },
  })
  const registeredPets = db.pet.count()
  // Grouping data
  const appointmentTrendsData = await db.appointments.groupBy({
    by: ['scheduledDateTime'],
    _count: { scheduledDateTime: true },
    where: {
      scheduledDateTime: { gte: new Date(new Date().getFullYear(), 0, 1) },
    },
  })

  const serviceUsageData = await db.serviceAppointments.groupBy({
    by: ['serviceId'],
    _count: { serviceId: true },
  })

  const petDemographicsData = await db.pet.groupBy({
    by: ['breedId'],
    _count: { breedId: true },
  })

  // Enriching data with additional details
  const serviceNames = await db.service.findMany({
    where: { id: { in: serviceUsageData.map((s) => s.serviceId) } },
    select: { id: true, name: true },
  })

  const breedNames = await db.breed.findMany({
    where: { id: { in: petDemographicsData.map((p) => p.breedId) } },
    select: { id: true, name: true },
  })

  const data = await db.$transaction([
    totalAppointments,
    activeServices,
    registeredPets,
  ])

  // Transforming data for charts
  const transformAppointmentTrends = appointmentTrendsData.map((data) => ({
    label: data.scheduledDateTime.toLocaleDateString(), // Format date as needed
    value: data._count.scheduledDateTime,
  }))

  const transformServiceUsage = serviceUsageData.map((data) => ({
    label:
      serviceNames.find((s) => s.id === data.serviceId)?.name ||
      'Unknown Service',
    value: data._count.serviceId,
  }))

  const transformPetDemographics = petDemographicsData.map((data) => ({
    label:
      breedNames.find((b) => b.id === data.breedId)?.name || 'Unknown Breed',
    value: data._count.breedId,
  }))

  return (
    <DashboardShell>
      <DashboardHeader heading='Panel de administración'></DashboardHeader>
      <div className='p-4'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          <StatsCard title='Total citas' value={data[0]} />
          <StatsCard title='Servicios activos' value={data[1]} />
          <StatsCard title='Mascotas registradas' value={data[2]} />
        </div>
        <div className='flex flex-col md:flex-row gap-4 mt-4'>
          <LineChart
            data={transformAppointmentTrends}
            title='Trends de citas'
          />
          <BarChart data={transformServiceUsage} title='Servicios usados' />
          <PieChart data={transformPetDemographics} title='Mascotas' />
        </div>
      </div>
    </DashboardShell>
  )
}

// {/* <div>
//   {posts?.length ? (
//     <div className='divide-y divide-border rounded-md border'>
//       {posts.map((post) => (
//         <PostItem key={post.id} pet={post} />
//       ))}
//     </div>
//   ) : (
//     <EmptyPlaceholder>
//       <EmptyPlaceholder.Icon name='post' />
//       <EmptyPlaceholder.Title>No posts created</EmptyPlaceholder.Title>
//       <EmptyPlaceholder.Description>
//         You don&apos;t have any posts yet. Start creating content.
//       </EmptyPlaceholder.Description>
//       {/* <PostCreateButton variant='outline' /> */}
// {/* <Button >PostCreateButton</Button>
//     </EmptyPlaceholder>
//   )}
// </div> */}
