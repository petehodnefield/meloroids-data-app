import React from "react";
import Link from "next/link";
import Head from "next/head";
import { useContext } from "react";
import { LoginContext } from "@/pages/_app";
import Auth from "../../utils/auth";
const Layout = ({ children }) => {
  const [loggedIn, setLoggedIn] = useContext(LoginContext);
  const logout = async (e) => {
    e.preventDefault();
    Auth.logout();
    await client.resetStore();
  };
  return (
    <div>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      </Head>
      <header>
        <Link href="/">
          <h1>Meloroids Data Application</h1>
        </Link>{" "}
        {loggedIn ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <Link href={"/login"}>Login</Link>
        )}
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
