import React from "react";
import { Icon } from "@iconify/react";
import { useQuery } from "@apollo/client";
import ALL_PROGRESSIONS from "../../../utils/queries";
import { ALL_GENRES } from "../../../utils/queries";
import { useState } from "react";

const ProgressionToGenre = () => {
  // Controls if genre menu is open
  const [genreOpen, setGenreOpen] = useState(false);
  const [genreSelected, setGenreSelected] = useState({
    id: "",
    genre: "",
  });
  const {
    loading: genreLoading,
    data: genreData,
    error: genreError,
  } = useQuery(ALL_GENRES);

  if (genreLoading) return <div>Loading...</div>;
  if (genreError) return <div>Error!</div>;

  const genres = genreData.genres;

  return (
    <div className="center-container">
      <h2 className="h2">Add Progression to Genre</h2>
      {/* Genre wrapper */}
      <div className="form-input-label-wrapper">
        <label className="form-label">Genre</label>
        {/* Container that is the selector */}
        <div
          onClick={() => setGenreOpen(!genreOpen)}
          className="select-wrapper"
        >
          <p className="select-icon">🎶</p>
          <p className="select-text">{genreSelected.genre}</p>
          <p className="select-chevron">&#9660;</p>
        </div>
        {/* Container that opens when clicked */}
        {genreOpen ? (
          <div className="select-open-wrapper">
            {genres.map((genre) => (
              <p
                onClick={() => {
                  setGenreSelected({
                    ...genreSelected,
                    id: genre._id,
                    genre: genre.genre,
                  });
                  setGenreOpen(false);
                }}
                key={genre.genre}
                className="select-open-option"
              >
                {genre.genre}
              </p>
            ))}
          </div>
        ) : (
          ""
        )}
      </div>

      {/* Progression Wrapper */}
      <div>
        <p className="form-label">Progressions</p>
        {/* Buttons grid */}
        <div className="grid-btns">
          {/* Map with all progresions query */}
          <button className="btn btn-round btn-dark">i iv v</button>
          <button className="btn btn-round btn-dark">i iv v</button>
          <button className="btn btn-round btn-dark">i iv v</button>
          <button className="btn btn-round btn-dark">i iv v</button>
        </div>
      </div>
    </div>
  );
};

export default ProgressionToGenre;
