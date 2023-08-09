import React from "react";
import style from "@/styles/Artist.module.css";
import { useQuery, useMutation } from "@apollo/client";
import { CREATE_ALBUM } from "../../../utils/mutations";
import { useEffect, useState } from "react";
import { ARTIST_BY_NAME } from "../../../utils/queries";
import { initializeApollo } from "../../../lib/apollo";
import Image from "next/image";
import Link from "next/link";
const Artist = ({ queryName }) => {
  const [artistDetails, setArtistDetails] = useState({
    name: "",
    image: "",
    songs: [],
    albums: [],
    id: "",
  });
  const [newAlbum, setNewAlbum] = useState({
    name: "",
    artwork: "",
    year: "",
  });
  console.log(artistDetails);
  const selectedArtist = queryName.params[0];
  const { loading, data, error } = useQuery(ARTIST_BY_NAME, {
    variables: { name: selectedArtist },
  });
  const [createAlbum] = useMutation(CREATE_ALBUM);
  useEffect(() => {
    if (!data || data.artist === null || !data.artist) {
      return;
    } else {
      const { artist } = data;
      setArtistDetails({
        ...artistDetails,
        id: artist._id,
        name: artist.name,
        image: artist.image,
        songs: artist.songs,
        albums: artist.albums,
      });
    }
  }, [data]);

  const handleNewAlbum = async (e) => {
    e.preventDefault();
    try {
      await createAlbum({
        variables: {
          albumName: newAlbum.name,
          artwork: newAlbum.artwork,
          year: newAlbum.year,
          artistId: artistDetails.id,
        },
      });
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className={style.container}>
      <div className={style.artist}>
        <div className={style.artistNameWrapper}>
          <h2 className={style.artistName}>{artistDetails.name}</h2>
          <div className={style.artistImageWrapper}>
            <img
              className={style.artistImage}
              src={artistDetails.image}
              alt={`The artist ${artistDetails.name}`}
            />
          </div>
        </div>
      </div>
      <div>Add An ALbum</div>
      <form className="form--column" onSubmit={(e) => handleNewAlbum(e)}>
        <div className="form__input-label-wrapper">
          <label className="form__label">Album name</label>
          <input
            className="form__input"
            type="text"
            onChange={(e) => setNewAlbum({ ...newAlbum, name: e.target.value })}
          />
        </div>
        <div className="form__input-label-wrapper">
          <label className="form__label">Year</label>
          <input
            className="form__input"
            type="number"
            onChange={(e) => setNewAlbum({ ...newAlbum, year: e.target.value })}
          />
        </div>
        <div className="form__input-label-wrapper">
          <label className="form__label">Artwork</label>
          <input
            className="form__input"
            type="url"
            onChange={(e) =>
              setNewAlbum({ ...newAlbum, artwork: e.target.value })
            }
          />
        </div>
        <button type="submit" className="btn btn-primary rounded">
          {" "}
          Add album
        </button>
      </form>
      <div className={style.albums}>
        <h3 className={style.subtitle}>Albums</h3>
        <div className={style.albumsWrapper}>
          {artistDetails.albums.map((album) => (
            <Link
              key={album.album_name}
              href={`/artists/album/${album._id}`}
              className={style.albumWrapper}
            >
              <h4 className={style.albumName}>{album.album_name}</h4>
              <div className={style.albumImageWrapper}>
                <img className={style.albumImage} src={album.artwork} />
              </div>
              <h4>{album.year}</h4>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Artist;

export const getServerSideProps = async ({ query }) => {
  const queryName = query;
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: ARTIST_BY_NAME,
    variables: { name: queryName.params[0] },
  });

  return {
    props: { initializeApolloState: apolloClient.cache.extract(), queryName },
  };
};
