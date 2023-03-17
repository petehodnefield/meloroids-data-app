import React from "react";
import { useQuery } from "@apollo/client";
import { ALL_ARTISTS } from "../../../utils/queries";

const Artists = () => {
  const { loading, data, error } = useQuery(ALL_ARTISTS);
  if (loading) return <div> Loading...</div>;

  console.log(data);
  return (
    <div>
      <h2 className="header">ARTISTS</h2>
      <div className="artist-grid">
        {data.artists.map((artist) => (
          <div>
            <h2>{artist.name}</h2>
            <div className="artist-imgWrapper">
              <img className="artist-img" src={artist.image} />
            </div>
            <h3 className="sub-header">Albums:</h3>
            <div className="albumsWrapper">
              {artist.albums.map((album) => (
                <div className="container">
                  <div className="album-imgWrapper">
                    <img className="album-img" src={album.artwork} />
                  </div>{" "}
                  {album.album_name}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Artists;
