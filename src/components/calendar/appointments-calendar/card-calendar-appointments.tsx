'use client'
import { useEffect, useState } from 'react'
import { CardCalendar } from './card-calendar'
import { Appointments } from '@/models/schemas.d'

const PAGE_SIZE = 8 // Número de citas por página

export const CardCalendarAppointments = ({
  appointments,
  pageCount,
}: {
  appointments: Appointments[]
  pageCount: number
}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = pageCount

  const currentAppointments = appointments.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  )

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
  }

  return (
    <>
      <CardCalendar
        appointments={currentAppointments}
        onPageChange={handlePageChange}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </>
  )
}
