import React from "react";
import { useQuery } from "@apollo/client";
import { ALL_ALBUMS } from "../../../utils/queries";

const Albums = () => {
  const { loading, data, error } = useQuery(ALL_ALBUMS);
  if (loading) return <div>Loading...</div>;
  return (
    <div>
      <h2 className="header">Albums</h2>
      <div>
        {data.albums.map((album) => (
          <div>
            <div className="artist-imgWrapper">
              <img className="artist-img" src={album.artwork} />
            </div>
            <h3>{album.album_name}</h3>
            <h4>Songs:</h4>
            {album.songs.map((song) => (
              <div>
                <li>{song.song_name}</li>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Albums;
