import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  HttpLink,
  ApolloLink,
} from "@apollo/client";

import { setContext } from "@apollo/client/link/context";

function createApolloClient() {
  const httpLink = createHttpLink({
    uri: "http://localhost:4000/graphql",
  });

  const authLink = setContext((_, { headers }) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("id_token");
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : "",
        },
      };
    }
  });
  const link = ApolloLink.from([authLink, httpLink]);

  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: link,
    cache: new InMemoryCache(),
  });
}

export default createApolloClient;
