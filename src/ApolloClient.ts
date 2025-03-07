import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://api.github.com/graphql",
    headers: {
      Authorization: `Bearer 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`,
    },
  }),
  cache: new InMemoryCache(),
});

export default client;
