import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";

import Link from "next/link";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <section className="homepage-wrapper">
      {/* Queries container */}
      <div className="query-mutation-wrapper">
        <h2 className="h2 white">Queries</h2>
        <ul>
          <li className="link-li">
            <Link className="page-link" href={"/genres"}>
              All Genres
            </Link>
          </li>
          <li className="link-li">
            <Link className="page-link" href={"/progressions"}>
              All Progressions
            </Link>
          </li>
          <li className="link-li">
            <Link className="page-link" href={"/artists"}>
              All Artists
            </Link>
          </li>
          <li className="link-li">
            <Link className="page-link" href={"/albums"}>
              All Albums
            </Link>
          </li>
        </ul>
      </div>
      {/* Mutations container */}
      <div className="query-mutation-wrapper">
        <h2 className="h2 white">Mutations</h2>
        <ul>
          <li className="link-li">
            <Link className="page-link" href={"/progression-to-genre"}>
              Add Progression to Genre{" "}
            </Link>
          </li>
          <li className="link-li">
            <Link className="page-link" href={"/allkey-to-progression"}>
              Add AllKey to Progression{" "}
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
