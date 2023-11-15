'use client'
// types/Event.ts
export interface Event {
  title: string
  start: Date
  end: Date
}

// components/MyCalendar.tsx
import {
  Calendar,
  momentLocalizer,
  dateFnsLocalizer,
  Event as CalendarEvent,
} from 'react-big-calendar'
// import moment from 'moment'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import es from 'date-fns/locale/es'

const locales = {
  es: es,
}
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})
console.log('🚀 ~ file: big-calendar.tsx:19 ~ localizer:', localizer)

interface MyCalendarProps {
  events: Event[]
}

const MyCalendar: React.FC<MyCalendarProps> = ({ events }) => {
  return (
    <div style={{ height: 350 }}>
      <Calendar
        localizer={localizer}
        events={events as CalendarEvent[]}
        startAccessor='start'
        endAccessor='end'
        // className='h-[200]'
        style={{ height: 350 }}
        // messages={{
        //   next: 'Siguiente',
        //   previous: 'Anterior',
        //   today: 'Hoy',
        //   month: 'Mes',
        //   week: 'Semana',
        //   day: 'Día',
        //   agenda: 'Agenda',
        //   date: 'Fecha',
        //   time: 'Hora',
        //   event: 'Evento', // Cambia los textos según tus necesidades
        //   // ... otros textos que quieras personalizar
        // }}
      />
    </div>
  )
}

export { MyCalendar }

// pages/calendar.tsx

// const CalendarPage: React.FC = () => {
//   const events: Event[] = [
//     {
//       title: 'Cita con Charlie',
//       start: new Date(2023, 11, 0, 10, 0), // Año, Mes (0-index), Día, Hora, Minutos
//       end: new Date(2023, 11, 0, 11, 0),
//     },
//     // ... más eventos
//   ]

//   return <MyCalendar events={events} />
// }

// export { CalendarPage }
