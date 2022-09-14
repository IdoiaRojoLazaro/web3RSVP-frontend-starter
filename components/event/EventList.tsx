import { ExclamationIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import React from 'react'
import { NEW_EVENT_ROUTE } from '../../constants/routes'
import { Event } from '../../interfaces/EventInterface'
import EventCard from '../EventCard'

export const EventList = ({ events }: { events: Event[] }) => {
  if (events.length === 0) {
    return (<div className="text-center">
      <ExclamationIcon className="w-16 h-16 m-auto" />
      <p className="m-10 text-base text-gray-500 sm:mt-5 sm:text-lg sm:mx-auto md:mt-5 md:text-xl sm:max-w-xl m-autolg:mx-0">
        There are no events upcoming. Do not hesitate and create one
        yourself.
      </p>

      <Link href={NEW_EVENT_ROUTE}>
        <a className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-antiqueBlue-700 border-antiqueBlue-100 transition-all hover:bg-antiqueBlue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-antiqueBlue-500">
          Create Event
        </a>
      </Link>
    </div>)
  }

  return (
    <ul
      role="list"
      className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
    >
      {events.map((event) => (
        <li key={event.id}>
          <EventCard
            id={event.id}
            name={event.name}
            eventTimestamp={event.eventTimestamp}
            imageURL={event.imageURL}
            totalRSVPs={event.totalRSVPs}
            maxCapacity={event.maxCapacity}
          />
        </li>
      ))}
    </ul>
  )
}
