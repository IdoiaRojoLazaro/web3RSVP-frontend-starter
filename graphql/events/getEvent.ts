import { gql } from "@apollo/client";

export const EVENT_QUERY = gql`
  query Event($id: String!) {
    event(id: $id) {
      id
      eventID
      name
      description
      link
      eventOwner
      eventTimestamp
      maxCapacity
      deposit
      totalRSVPs
      totalConfirmedAttendees
      imageURL
      rsvps {
        id
        attendee {
          id
        }
      }
    }
  }
  `;