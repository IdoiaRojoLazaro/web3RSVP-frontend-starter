import { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import EventCard from "../components/EventCard";
import Landing from "../components/Landing";
import { validate } from "graphql";
import Link from "next/link";
import {
  ExclamationIcon,
  FolderOpenIcon,
  PlusIcon,
} from "@heroicons/react/outline";

const UPCOMING_EVENTS = gql`
  query Events($currentTimestamp: String) {
    events(where: { eventTimestamp_gt: $currentTimestamp }) {
      id
      name
      eventTimestamp
      imageURL
      maxCapacity
      totalRSVPs
    }
  }
`;

export default function Home() {
  const [currentTimestamp, setEventTimestamp] = useState(
    new Date().getTime().toString()
  );
  const { loading, error, data } = useQuery(UPCOMING_EVENTS, {
    variables: { currentTimestamp },
  });

  if (loading)
    return (
      <Landing>
        <p>Loading...</p>
      </Landing>
    );
  if (error)
    return (
      <Landing>
        <p>`Error! ${error.message}`</p>
      </Landing>
    );
  console.log(data);
  if (data && data.events.length === 0) {
    return (
      <Landing>
        <div className="text-center">
          <ExclamationIcon className="w-16 h-16 m-auto" />
          <p className="m-10 text-base text-gray-500 sm:mt-5 sm:text-lg sm:mx-auto md:mt-5 md:text-xl sm:max-w-xl m-autolg:mx-0">
            There are no events upcoming. Do not hesitate and create one
            yourself.
          </p>

          <Link href="/create-event">
            <a className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-antiqueBlue-700 border-antiqueBlue-100 transition-all hover:bg-antiqueBlue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-antiqueBlue-500">
              Create Event
            </a>
          </Link>
        </div>
      </Landing>
    );
  }
  return (
    <Landing>
      <ul
        role="list"
        className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
      >
        {data &&
          data.events.map((event) => (
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
    </Landing>
  );
}
