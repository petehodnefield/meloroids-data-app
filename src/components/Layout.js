import React from "react";
import Link from "next/link";
import Head from "next/head";
const Layout = ({ children }) => {
  return (
    <div>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <header>
        <Link href="/">
          <h1>Meloroids Data Application</h1>
        </Link>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
