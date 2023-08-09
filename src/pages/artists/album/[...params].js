import React, { useState, useEffect } from "react";
import { initializeApollo } from "../../../../lib/apollo";
import { ALBUM } from "../../../../utils/queries";
import { DELETE_ALBUM } from "../../../../utils/mutations";
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
  const [deleteAlbum] = useMutation(DELETE_ALBUM);
  const { loading, data, error } = useQuery(ALBUM, {
    variables: { albumId: queryID.params[0] },
  });

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
          <form className="form--column">
            <div className="form__input-label-wrapper">
              <label className="form__label">Song name</label>
              <input className="form__input" type="text" />
            </div>
            <div className="form__input-label-wrapper">
              <label className="form__label">Tempo</label>
              <input className="form__input" type="number" />
            </div>
            <div className="form__input-label-wrapper">
              <label className="form__label">Popularity</label>
              <input className="form__input" type="text" />
            </div>
            <div className="form__input-label-wrapper">
              <label className="form__label">Progression</label>
              <input className="form__input" type="text" />
            </div>

            <div className="form__input-label-wrapper">
              <label className="form__label">Key</label>
              <input className="form__input" type="text" />
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
  console.log(queryID.params);
  await apolloClient.query({
    query: ALBUM,
    variables: { albumId: queryID.params[0] },
  });

  return {
    props: { initializeApolloState: apolloClient.cache.extract(), queryID },
  };
};
