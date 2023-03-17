import React, { useState, useEffect } from "react";
import { ALL_SONGS, ALL_ALBUMS } from "../../../utils/queries";
import { useQuery, useMutation } from "@apollo/client";
import { SONG_TO_ALBUM } from "../../../utils/mutations";
const SongsToAlbums = () => {
  // Array to hold our selected Songs
  let [selectedSongs, setSelectedSongs] = useState([]);
  console.log("selected songs array: ", selectedSongs);
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

  // AllSongs query
  const {
    loading: songLoading,
    data: songData,
    error: songError,
  } = useQuery(ALL_SONGS);
  // AllAlbums Query
  const {
    loading: albumLoading,
    data: albumData,
    error: albumError,
  } = useQuery(ALL_ALBUMS);

  const [addSong, { error }] = useMutation(SONG_TO_ALBUM);

  if (songLoading || albumLoading) return <div>Loading...</div>;

  const gatherSongs = async () => {
    selectedSongs.forEach((song) => {
      const { data } = addSong({
        variables: { id: album.id, songId: song._id },
      });
      console.log(data);
    });
  };

  console.log(songData.songs);
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    gatherSongs();
    // try {
    //   const { data } = await addSong({
    //     variables: { id: album.id, songId: song.id },
    //   });
    //   console.log(data);
    // } catch (e) {
    //   console.log(e);
    // }
  };
  const deleteById = (id) => {
    setSelectedSongs((selectedSongs) => {
      return selectedSongs.filter((song) => song._id !== id);
    });
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
                    setSelectedSongs((selectedSongs) => [
                      ...selectedSongs,
                      song,
                    ]);
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
      {selectedSongs ? (
        <div>
          <h2>SelectedSongs:</h2>
          {selectedSongs.map((song) => (
            <div key={song.song_name}>
              <p>{song.song_name}</p>
              <button onClick={() => deleteById(song._id)}>Remove</button>
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default SongsToAlbums;
