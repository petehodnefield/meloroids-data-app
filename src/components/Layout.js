import React from "react";
import Link from "next/link";
const Layout = ({ children }) => {
  return (
    <div>
      <Link href="/">
        <h1>Home</h1>
      </Link>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
