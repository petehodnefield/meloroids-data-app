import React, { useState } from "react";
import { ALL_SONGS, ALL_ALBUMS } from "../../../utils/queries";
import { useQuery, useMutation } from "@apollo/client";
import { SONG_TO_ALBUM } from "../../../utils/mutations";
const SongsToAlbums = () => {
  //   Setting the state of the chosen song
  const [songOpen, setSongOpen] = useState(false);
  const [song, setSong] = useState({
    song_name: "",
    id: "",
  });

  //   Setting the state of the chosen album
  const [albumOpen, setAlbumOpen] = useState(false);
  const [album, setAlbum] = useState({
    album_name: "",
    id: "",
  });

  const {
    loading: songLoading,
    data: songData,
    error: songError,
  } = useQuery(ALL_SONGS);
  const {
    loading: albumLoading,
    data: albumData,
    error: albumError,
  } = useQuery(ALL_ALBUMS);

  const [addSong, { error }] = useMutation(SONG_TO_ALBUM);

  if (songLoading || albumLoading) return <div>Loading...</div>;

  console.log(songData);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await addSong({
        variables: { id: album.id, songId: song.id },
      });
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="container">
      {" "}
      <h2 className="header">Add Songs to Albums</h2>
      <form
        id="SongsToAlbums"
        className="container"
        onSubmit={handleFormSubmit}
      >
        <div className="form-inputWrapper">
          <label className="form-label" htmlFor="Artist">
            Album
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

        {/* Song input */}
        <div className="form-inputWrapper">
          <label className="form-label" htmlFor="Artist">
            Songs
          </label>
          <div
            onClick={() => setSongOpen(!songOpen)}
            className="form-inputField"
          >
            <p className="form-input">{song.song_name}</p>
          </div>
          {!songOpen
            ? ""
            : songData.songs.map((song) => (
                <div
                  onClick={() => {
                    setSong({
                      ...song,
                      song_name: song.song_name,
                      id: song._id,
                    });
                    setSongOpen(false);
                  }}
                  key={song.song_name}
                >
                  <p>{song.song_name}</p>
                </div>
              ))}
        </div>
        {/* Submit BTN */}
        <button type="submit" className="btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SongsToAlbums;
