import { useState } from "react";
import { useQuery } from "@apollo/client";
import Landing from "../components/Landing";
import { UPCOMING_EVENTS } from "../graphql/events/getUpcomingEvents";
import { currentTime } from "../helpers/timeHelper";
import { LoadingEvents } from "../components/event/LoadingEvents";
import { EventList } from "../components/event/EventList";
import { Error } from "../components/shared/Error";

export default function Home() {
  const [currentTimestamp, _] = useState(currentTime());

  const { loading, error, data } = useQuery(UPCOMING_EVENTS, {
    variables: { currentTimestamp },
  });

  return (
    <Landing>
      {error ?
        <Error message={error?.message} />
        : (
          <>
            <h2 className="font-bold text-lg text-on-info mb-6">Latest upcoming events</h2>
            {
              loading ? (
                <LoadingEvents />
              ) : (
                <EventList events={data.events} />
              )
            }
          </>
        )}
    </Landing>
  );
}
