import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://api.github.com/graphql",
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_APOLLO_CLIENT_KEY}`,
    },
  }),
  cache: new InMemoryCache(),
});

export default client;
