import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://api.thegraph.com/subgraphs/name/idoiarojolazaro/web3-rsvp-idoia",
  cache: new InMemoryCache(),
});

export default client;
