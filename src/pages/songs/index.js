import React from "react";
import { useQuery } from "@apollo/client";
import { ALL_ARTISTS } from "../../../utils/queries";
import Link from "next/link";
const Songs = () => {
  const { loading, data, error } = useQuery(ALL_ARTISTS);
  if (loading) return <div> Loading...</div>;
  return (
    <div className="container">
      <h2 className="artist__pgHeader">ARTISTS</h2>
      <div className="artist-grid">
        {data.artists.map((artist) => (
          <Link href={`/songs/${artist.name}`}>
            <div className="artist">
              <h2 className="artist__title">{artist.name}</h2>
              <div className="artist__imgWrapper">
                <img className="artist__img" src={artist.image} />
              </div>
              <h3 className="artist__subtitle">Albums:</h3>
              <div className="artist__albums">
                {artist.albums.map((album) => (
                  <div className="artist__albumContent">
                    <div className="artist__albumContentWrapper">
                      <img className="artist__albumImg" src={album.artwork} />
                    </div>{" "}
                    {album.album_name}
                  </div>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Songs;
