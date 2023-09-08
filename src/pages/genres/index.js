import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { ALL_GENRES } from "../../../utils/queries";
import { CREATE_GENRE, DELETE_GENRE } from "../../../utils/mutations";
import Link from "next/link";
const Genres = () => {
  const [newGenre, setNewGenre] = useState("");
  const [allGenres, setAllGenres] = useState();

  const { data } = useQuery(ALL_GENRES);
  const [createGenre] = useMutation(CREATE_GENRE);
  const [deleteGenre] = useMutation(DELETE_GENRE);
  useEffect(() => {
    if (!data || data.genres === null) {
      return;
    } else {
      const genres = data.genres;
      setAllGenres(genres);
    }
  }, [data]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const createdGenre = await createGenre({
        variables: { genre: newGenre },
      });
      const newGenreId = createdGenre.data.createGenre._id;
      window.location.replace(`/genres/add-progressions/${newGenreId}`);
    } catch (e) {
      console.log(e);
    }
  };

  const handleGenreDelete = async (genreName, genreId) => {
    const confirmDeletion = window.confirm(
      `Are you sure you want to delete ${genreName}?`
    );
    if (confirmDeletion) {
      try {
        await deleteGenre({
          variables: { id: genreId },
        });
        window.location.reload();
      } catch (e) {
        console.log(e);
      }
    }
    return;
  };
  return (
    <div className="container">
      <h1>Genres</h1>
      <div className="container--row">
        <div>
          <h2>All Genres</h2>
          <div className="card card--align-start card--lg">
            {allGenres
              ? allGenres.map((genre) => (
                  <Link
                    key={genre._id}
                    className="card__row"
                    href={`/genres/add-progressions/${genre._id}`}
                  >
                    {genre.genre}{" "}
                    <div className="card__row-action-wrapper">
                      <p className="card__row-action">Edit</p>
                      <p
                        className="card__row-action"
                        onClick={() =>
                          handleGenreDelete(genre.genre, genre._id)
                        }
                      >
                        Delete
                      </p>
                    </div>
                  </Link>
                ))
              : ""}
          </div>
        </div>
        <div className="card card--lg">
          <h2>Add New Genre</h2>
          <form
            className="form--column"
            id="newGenreForm"
            onSubmit={(e) => handleFormSubmit(e)}
          >
            <div className="form__input-label-wrapper">
              <label className="form__label" htmlFor="genre">
                Genre Name
              </label>
              <input
                id="genre"
                name="genre"
                className="form__input"
                type="text"
                onChange={(e) => setNewGenre(e.target.value)}
              />
            </div>
            <button className="btn btn-primary rounded">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Genres;
