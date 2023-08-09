import React from "react";
import { useQuery } from "@apollo/client";
import { ALL_ARTISTS } from "../../../utils/queries";
import Link from "next/link";
const Artists = () => {
  const { loading, data, error } = useQuery(ALL_ARTISTS);
  if (loading) return <div> Loading...</div>;

  console.log(data);
  return (
    <div className="container">
      <h2 className="artist__pgHeader">ARTISTS</h2>
      <div className="artist-grid">
        {data.artists.map((artist) => (
          <Link
            className="artist"
            key={artist.name}
            href={`/artists/${artist.name}`}
          >
            <h2 className="artist__title">{artist.name}</h2>
            <div className="artist__imgWrapper">
              <img className="artist__img" src={artist.image} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Artists;
