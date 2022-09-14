import { gql } from "@apollo/client";

export const UPCOMING_EVENTS = gql`
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