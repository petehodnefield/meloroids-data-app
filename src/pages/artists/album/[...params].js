import React, { useState, useEffect } from "react";
import { initializeApollo } from "../../../../lib/apollo";
import { ALBUM, ALL_PROGRESSIONS, ALL_KEYS } from "../../../../utils/queries";
import { DELETE_ALBUM, CREATE_SONG } from "../../../../utils/mutations";
import { useQuery, useMutation } from "@apollo/client";
import style from "@/styles/IndividualAlbum.module.css";
const ArtistsAlbums = ({ queryID }) => {
  const [albumDetails, setAlbumDetails] = useState({
    album_id: "",
    album_name: "",
    album_artwork: "",
    album_year: "",
    album_songs: [],
  });

  const [newSongParams, setNewSongParams] = useState({
    name: "",
    tempo: "",
    key: "",
    keyId: "",
    keyMajor: "",
    progressionId: "",
    progressionNumerals: "",
  });
  console.log(albumDetails.album_id, newSongParams);

  const [specificKeys, setSpecificKeys] = useState([]);
  const [specificProgressions, setSpecificProgressions] = useState([]);
  const [keyDropdown, setKeyDropdown] = useState(false);
  const [progressionDropdown, setProgressionDropdown] = useState(false);

  const [deleteAlbum] = useMutation(DELETE_ALBUM);
  const [createSong] = useMutation(CREATE_SONG);
  const { loading, data, error } = useQuery(ALBUM, {
    variables: { albumId: queryID.params[0] },
  });
  const { data: keysData } = useQuery(ALL_KEYS);
  const { data: progressionData } = useQuery(ALL_PROGRESSIONS);
  useEffect(() => {
    if (!data || data.album === null || !data.album) {
      return;
    } else {
      const { album } = data;
      setAlbumDetails({
        ...albumDetails,
        album_id: album._id,
        album_name: album.album_name,
        album_artwork: album.artwork,
        album_year: album.year,
        album_songs: album.songs,
      });
    }
  }, [data]);

  const handleAlbumDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this?"
    );
    if (confirmDelete) {
      try {
        await deleteAlbum({
          variables: { id: albumDetails.album_id },
        });
      } catch (e) {
        console.log(e);
      }
    } else {
      return;
    }
  };

  const filterKeys = (e) => {
    const results = keysData.keys.filter((key) =>
      key.key.toLowerCase().includes(e.toLowerCase())
    );
    setSpecificKeys(results);
  };
  const filterProgressions = (e) => {
    const results = progressionData.progressions.filter((progression) =>
      progression.numerals.toLowerCase().includes(e.toLowerCase())
    );
    setSpecificProgressions(results);
  };

  const handleNewSong = async (e) => {
    e.preventDefault();
    try {
      await createSong({
        variables: {
          songName: newSongParams.name,
          tempo: newSongParams.tempo,
          progressionId: newSongParams.progressionId,
          keyId: newSongParams.keyId,
          albumId: albumDetails.album_id,
        },
      });
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className={style.container}>
      <div
        style={{
          backgroundImage: `url(${albumDetails.album_artwork})`,
        }}
        className={style.albumNameContainer}
      >
        <div className={style.albumNameTextWrapper}>
          <h2 className={style.albumName}>{albumDetails.album_name}</h2>
          <h3 className={style.albumYear}>{albumDetails.album_year}</h3>
          <button
            className={`btn ${style.deleteButton}`}
            onClick={() => handleAlbumDelete()}
          >
            Delete Album
          </button>
        </div>
      </div>

      <section className={style.containerRow}>
        {/* Map through songs */}
        <div className={style.albumDetails}>
          <h3 className={style.albumDetailsTitle}>
            Songs on {albumDetails.album_name}
          </h3>
          <div>
            {albumDetails.album_songs.map((song) => (
              <div>
                <h3>{song.song_name}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Add songs form */}
        <div className={style.addSongsContainer}>
          <h3 className={style.addSongsTitle}>
            Add songs to {albumDetails.album_name}
          </h3>
          <form onSubmit={(e) => handleNewSong(e)} className="form--column">
            <div className="form__input-label-wrapper">
              <label className="form__label">Song name</label>
              <input
                className="form__input"
                type="text"
                onChange={(e) => {
                  setNewSongParams({ ...newSongParams, name: e.target.value });
                  setKeyDropdown(true);
                }}
              />
            </div>
            <div className="form__input-label-wrapper">
              <label className="form__label">Tempo</label>
              <input
                className="form__input"
                type="number"
                onChange={(e) =>
                  setNewSongParams({
                    ...newSongParams,
                    tempo: Number(e.target.value),
                  })
                }
              />
            </div>

            <div className="form__input-label-wrapper">
              <label className="form__label">Key</label>
              <div>
                <input
                  className="form__input"
                  type="text"
                  onChange={(e) => {
                    filterKeys(e.target.value);
                    setKeyDropdown(true);
                  }}
                />
                {newSongParams.key ? (
                  <p>
                    Selected key: {newSongParams.key}{" "}
                    {newSongParams.keyMajor ? "major" : "minor"}
                  </p>
                ) : (
                  ""
                )}
              </div>
              <div>
                {keyDropdown ? (
                  <div className="dropdown__wrapper">
                    {specificKeys.map((specific) => (
                      <div
                        className="dropdown"
                        key={`${specific.key} ${specific.is_major}`}
                        onClick={() => {
                          setNewSongParams({
                            ...newSongParams,
                            key: specific.key,
                            keyMajor: specific.is_major,
                            keyId: specific._id,
                          });
                          setKeyDropdown(false);
                        }}
                      >
                        {specific.key} {specific.is_major ? "major" : "minor"}
                      </div>
                    ))}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="form__input-label-wrapper">
              <label className="form__label">Progression</label>
              <div>
                <input
                  className="form__input"
                  type="text"
                  onChange={(e) => {
                    filterProgressions(e.target.value);
                    setProgressionDropdown(true);
                  }}
                ></input>
                {newSongParams.progressionNumerals ? (
                  <p>
                    Selected Progression: {newSongParams.progressionNumerals}
                  </p>
                ) : (
                  ""
                )}
              </div>
              {progressionDropdown ? (
                <div className="dropdown__wrapper">
                  {specificProgressions.map((specific) => (
                    <div
                      className="dropdown"
                      key={`${specific.numerals} `}
                      onClick={() => {
                        setNewSongParams({
                          ...newSongParams,
                          progressionId: specific._id,
                          progressionNumerals: specific.numerals,
                        });
                        setProgressionDropdown(!progressionDropdown);
                      }}
                    >
                      {specific.numerals}{" "}
                    </div>
                  ))}
                  {/* Add a new progression */}
                </div>
              ) : (
                ""
              )}
            </div>
            <button className="btn btn-primary rounded" type="submit">
              Add song
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ArtistsAlbums;
export const getServerSideProps = async ({ query }) => {
  const queryID = query;
  const apolloClient = initializeApollo();
  await apolloClient.query({
    query: ALBUM,
    variables: { albumId: queryID.params[0] },
  });

  return {
    props: { initializeApolloState: apolloClient.cache.extract(), queryID },
  };
};
