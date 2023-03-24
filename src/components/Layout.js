import React from "react";
import Link from "next/link";
const Layout = ({ children }) => {
  return (
    <div>
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
