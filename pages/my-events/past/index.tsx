import { useState } from "react";
import Link from "next/link";
import { gql, useQuery } from "@apollo/client";
import { useAccount } from "wagmi";
import EventCard from "../../../components/EventCard";
import Dashboard from "../../../components/Dashboard";
import { ConnectWalletSection } from "../../../components/shared/ConnectWalletSection";

const MY_PAST_EVENTS = gql`
  query Events($eventOwner: String, $currentTimestamp: String) {
    events(
      where: { eventOwner: $eventOwner, eventTimestamp_lt: $currentTimestamp }
    ) {
      id
      eventID
      name
      description
      eventTimestamp
      maxCapacity
      totalRSVPs
      imageURL
    }
  }
`;

export default function MyPastEvents() {
  const { data: account } = useAccount();

  const eventOwner = account ? account.address.toLowerCase() : "";
  const [currentTimestamp, setEventTimestamp] = useState(
    new Date().getTime().toString()
  );
  const { loading, error, data } = useQuery(MY_PAST_EVENTS, {
    variables: { eventOwner, currentTimestamp },
  });

  if (loading)
    return (
      <Dashboard page="events" isUpcoming={false}>
        <p>Loading...</p>
      </Dashboard>
    );
  if (error)
    return (
      <Dashboard page="events" isUpcoming={false}>
        <p>`Error! ${error.message}`</p>
      </Dashboard>
    );

  return (
    <Dashboard page="events" isUpcoming={false}>
      {account ? (
        <div>
          {data && data.events.length == 0 && <p>No past events found</p>}
          {data && data.events.length > 0 && (
            <ul
              role="list"
              className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
            >
              {data.events.map((event) => (
                <li key={event.id}>
                  <EventCard
                    id={event.id}
                    name={event.name}
                    eventTimestamp={event.eventTimestamp}
                    imageURL={event.imageURL}
                    totalRSVPs={event.totalRSVPs}
                    maxCapacity={event.maxCapacity}
                  />
                  {event.totalRSVPs > 0 &&
                    event.totalRSVPs > event.confirmedAttendees && (
                      <Link href={`/my-events/past/${event.id}`}>
                        <a className="text-antiqueBlue-600 text-sm truncate hover:text-antiqueBlue-800 px-5 pb-5 block">
                          Confirm attendees
                        </a>
                      </Link>
                    )}
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <ConnectWalletSection />
      )}
    </Dashboard>
  );
}
