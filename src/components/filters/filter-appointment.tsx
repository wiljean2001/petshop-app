'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Button } from '../ui/button'
import { Suspense, lazy, useCallback, useEffect, useState } from 'react'
import { isValid, parseISO } from 'date-fns'
import { DateRange, SelectRangeEventHandler } from 'react-day-picker'
import { Skeleton } from '../ui/skeleton'
import RangeDatesAppointment from './range-dates-appointment'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible'
import { Icons } from '../icons'

const SelectClinicAppointment = lazy(
  () => import('./select-clinic-appointment')
)
const SelectVetAppointment = lazy(() => import('./select-vet-appointment'))
const SelectPetAppointment = lazy(() => import('./select-pet-appointment'))
const SelectOwnerAppointment = lazy(() => import('./select-owner-appointment'))

export default function FilterAppointment() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Search params
  const page = searchParams?.get('page') || 1
  const per_page = searchParams?.get('per_page') || 10

  // Create query string
  const createQueryString = useCallback(
    (params: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams(searchParams?.toString())

      for (const [key, value] of Object.entries(params)) {
        if (value === null) {
          newSearchParams.delete(key)
        } else {
          newSearchParams.set(key, String(value))
        }
      }

      return newSearchParams.toString()
    },
    [searchParams]
  )
  useEffect(() => {
    router.push(
      `${pathname}?${createQueryString({
        page,
      })}`
    )

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // State Clinic
  const [clinic, setClinic] = useState(searchParams?.get('clinic') || '')
  // State Veterinarian
  const [veterinarian, setVeterinarian] = useState(
    searchParams?.get('veterinarian') || ''
  )
  // State pet
  const [pet, setPet] = useState(searchParams?.get('pet') || '')
  // State Owner
  const [owner, setOwner] = useState(searchParams?.get('owner') || '')

  // Parse the range dates
  const parseDateRange = (dateRangeString: string): DateRange | undefined => {
    const [fromStr, toStr] = dateRangeString.split(',')
    const from = isValid(parseISO(fromStr)) ? parseISO(fromStr) : undefined
    const to = isValid(parseISO(toStr)) ? parseISO(toStr) : undefined
    return from && to ? { from, to } : undefined
  }
  const initialDateRange = searchParams.get('date')
    ? parseDateRange(searchParams.get('date')!)
    : undefined
  // State date ranges
  const [date, setDate] = useState<DateRange | undefined>(initialDateRange)
  const [appointmentStatus, setAppointmentStatus] = useState(
    searchParams?.get('appointmentStatus') || ''
  )

  // Function to apply filters
  const applyFilters = () => {
    const params: any = {}

    if (clinic) params.clinic = clinic
    if (veterinarian) params.veterinarian = veterinarian
    if (pet) params.pet = pet
    if (owner) params.owner = owner
    if (appointmentStatus) params.appointmentStatus = appointmentStatus

    // Send date to url
    if (date?.from && date?.to) {
      params.date = `${date.from.toISOString().split('T')[0]},${
        date.to.toISOString().split('T')[0]
      }`
    }

    // Incluye siempre los parámetros de paginación
    params.page = page
    params.per_page = per_page

    if (params) {
      const queryString = createQueryString(params)
      router.push(`${pathname}?${queryString}`, { scroll: true })
    }
  }

  const resetFilters = () => {
    setClinic('')
    setVeterinarian('')
    setPet('')
    setOwner('')
    // Crear un objeto con los parámetros restablecidos
    // Asegurándose de que se pasen como null para que sean eliminados por createQueryString
    const resetParams = {
      clinic: null,
      veterinarian: null,
      pet: null,
      owner: null,
      date: null,
      appointmentStatus: null,
      page, // Mantener el valor actual de la paginación
      per_page, // Mantener el valor actual de la paginación
    }

    // Crear la cadena de consulta con los parámetros restablecidos
    const queryString = createQueryString(resetParams)
    router.push(`${pathname}?${queryString}`, { scroll: true })
  }

  const handleRangeSelect: SelectRangeEventHandler = (
    range: DateRange | undefined
  ) => setDate(range)

  return (
    <Collapsible>
      <div className='flex items-center justify-center space-x-4 px-4'>
        <h4 className='text-sm font-semibold'>Filtrar</h4>
        <CollapsibleTrigger asChild>
          <Button variant='ghost' size='sm' className='w-9 p-0'>
            <Icons.chevronDownIcon className='h-4 w-4' />
            <span className='sr-only'>Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className='container'>
        <div className='py-2 md:p-4 rounded-lg'>
          <div className='flex flex-wrap -mx-4 justify-center'>
            {/* Filtro por Clínica */}
            <Suspense
              fallback={
                <div className='w-60 h-12 px-2 mb-4 md:mb-0'>
                  <label htmlFor='clinic' className='block text-sm font-medium'>
                    Clínica: (*)
                  </label>
                  <Skeleton className='w-full h-full'></Skeleton>
                </div>
              }
            >
              <SelectClinicAppointment clinic={clinic} setClinic={setClinic} />
            </Suspense>
            {/* Filtro for veterinarians */}
            <Suspense
              fallback={
                <div className='w-60 h-12 px-2 mb-4 md:mb-0'>
                  <label htmlFor='clinic' className='block text-sm font-medium'>
                    Veterinarios:
                  </label>
                  <Skeleton className='w-full h-full'></Skeleton>
                </div>
              }
            >
              <SelectVetAppointment
                vet={veterinarian}
                setVet={setVeterinarian}
                clinic={clinic}
              />
            </Suspense>

            {/* Filtro por dueños de mascota */}
            <Suspense
              fallback={
                <div className='w-60 h-12 px-2 mb-4 md:mb-0'>
                  <label htmlFor='clinic' className='block text-sm font-medium'>
                    Dueño de mascotas: (*)
                  </label>
                  <Skeleton className='w-full h-full'></Skeleton>
                </div>
              }
            >
              <SelectOwnerAppointment owner={owner} setOwner={setOwner} />
            </Suspense>

            {/* Filtro por mascota */}
            <Suspense
              fallback={
                <div className='w-60 h-12 px-2 mb-4 md:mb-0'>
                  <label htmlFor='clinic' className='block text-sm font-medium'>
                    Mascotas:
                  </label>
                  <Skeleton className='w-full h-full'></Skeleton>
                </div>
              }
            >
              <SelectPetAppointment pet={pet} setPet={setPet} owner={owner} />
            </Suspense>

            {/* Filtro por Fecha */}
            {clinic && (
              <RangeDatesAppointment
                date={date}
                handleRangeSelect={handleRangeSelect}
                clinic={clinic}
              />
            )}
            {/* Filtro por Estado de Cita */}
          </div>

          {/* Botón para aplicar filtros */}
          <div className='flex justify-center md:mt-4'>
            <Button onClick={applyFilters}>Aplicar Filtros</Button>
            <Button onClick={resetFilters} variant={'ghost'}>
              <Icons.trash className='w-4' />
            </Button>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
