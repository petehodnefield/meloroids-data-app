import React, { useState } from "react";
import { ALL_ALBUMS, ALL_ARTISTS } from "../../../utils/queries";
import { ALBUM_TO_ARTIST } from "../../../utils/mutations";
import { useQuery, useMutation } from "@apollo/client";
const AlbumToArtist = () => {
  //   Setting the state of the chosen artist
  const [artistOpen, setArtistOpen] = useState(false);
  const [artist, setArtist] = useState({
    name: "",
    id: "",
  });

  //   Setting the state of the chosen album
  const [albumOpen, setAlbumOpen] = useState(false);
  const [album, setAlbum] = useState({
    album_name: "",
    id: "",
  });

  //   GetArtists Query
  const {
    loading: artistLoading,
    data: artistData,
    error: artistError,
  } = useQuery(ALL_ARTISTS);
  //   GetAlbums Query
  const {
    loading: albumLoading,
    data: albumData,
    error: albumError,
  } = useQuery(ALL_ALBUMS);

  const [addAlbum, { error }] = useMutation(ALBUM_TO_ARTIST);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("ids", artist.id, album.id);
    try {
      const { data } = await addAlbum({
        variables: { id: artist.id, albumId: album.id },
      });
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  if (artistLoading || albumLoading) return <div>Loading...</div>;
  else console.log(albumData.albums);
  return (
    <div className="container">
      <h2 className="header">Add Albums to Artists</h2>
      <form onSubmit={handleFormSubmit} id="AlbumsToArtists" action="">
        <div className="form-inputWrapper">
          <label className="form-label" htmlFor="Artist">
            Artist
          </label>
          <div
            onClick={() => setArtistOpen(!artistOpen)}
            className="form-inputField"
          >
            <p className="form-input">{artist.name}</p>
          </div>
          {!artistOpen
            ? ""
            : artistData.artists.map((artist) => (
                <div
                  onClick={() => {
                    setArtist({
                      ...artist,
                      name: artist.name,
                      id: artist._id,
                    });
                    setArtistOpen(false);
                  }}
                  key={artist.name}
                >
                  <p>{artist.name}</p>
                </div>
              ))}
        </div>
        <div className="form-inputWrapper">
          <label className="form-label" htmlFor="Album">
            Albums (no connection yet)
          </label>
          <div
            onClick={() => setAlbumOpen(!albumOpen)}
            className="form-inputField"
          >
            <p className="form-input">{album.album_name}</p>
          </div>
          {!albumOpen
            ? ""
            : albumData.albums.map((album) => (
                <div
                  onClick={() => {
                    setAlbum({
                      ...album,
                      album_name: album.album_name,
                      id: album._id,
                    });
                    setAlbumOpen(false);
                  }}
                  key={album.album_name}
                >
                  <p>{album.album_name}</p>
                </div>
              ))}
        </div>
        <button className="btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AlbumToArtist;
