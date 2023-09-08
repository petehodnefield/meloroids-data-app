import "@/styles/globals.css";
import { createContext, useState, useEffect } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { useApollo } from "../../lib/apollo";
import Layout from "@/components/Layout";
import Auth from "../../utils/auth";

export const LoginContext = createContext();
export default function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  const [loggedIn, setLoggedIn] = useState();
  useEffect(() => {
    setLoggedIn(Auth.loggedIn());
  });
  return (
    <LoginContext.Provider value={[loggedIn, setLoggedIn]}>
      {" "}
      <ApolloProvider client={apolloClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </LoginContext.Provider>
  );
}
