import React from "react";
import { Icon } from "@iconify/react";
import { useQuery, useMutation } from "@apollo/client";
import { ALL_GENRES, ALL_PROGRESSIONS } from "../../../utils/queries";
import { PROGRESSION_TO_GENRE } from "../../../utils/mutations";
import { useState } from "react";

const ProgressionToGenre = () => {
  // Controls if genre menu is open
  const [genreOpen, setGenreOpen] = useState(false);
  const [genreSelected, setGenreSelected] = useState({
    id: "",
    genre: "",
  });

  const [selectedProgressions, setSelectedProgressions] = useState([]);

  //   ALL_GENRES Query
  const {
    loading: genreLoading,
    data: genreData,
    error: genreError,
  } = useQuery(ALL_GENRES);

  //   ALL_PROGRESSIONS Query
  const {
    loading: progressionLoading,
    data: progressionData,
    error: progressionError,
  } = useQuery(ALL_PROGRESSIONS);

  const [progressionToGenre, { error }] = useMutation(PROGRESSION_TO_GENRE);

  if (genreLoading || progressionLoading) return <div>Loading...</div>;
  if (genreError || progressionError) return <div>Error!</div>;

  const genres = genreData.genres;
  const progressions = progressionData.progressions;

  // Array to hold our selected progressions
  // let selectedProgressions = [];

  const gatherProgressions = async () => {
    console.log("hi", selectedProgressions);

    await selectedProgressions.forEach((progression) => {
      const { data } = progressionToGenre({
        variables: {
          id: genreSelected.id,
          progressionId: progression.id,
        },
      });
      console.log(data);
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    gatherProgressions();
  };

  return (
    <div className="center-container">
      <h2 className="h2">Add Progression to Genre</h2>
      <form onSubmit={handleFormSubmit} id="progressionToGenreForm" action="">
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
        <div className="form-input-label-wrapper">
          <p className="form-label">Progressions</p>
          {/* Buttons grid */}
          <div className="grid-btns">
            {/* Map with all progresions query */}
            {progressions.map((progression) => (
              <p
                key={progression.numerals}
                className={"btn btn-round btn-dark btn-p"}
                onClick={() => {
                  setSelectedProgressions([
                    ...selectedProgressions,
                    {
                      progression: progression.numerals,
                      id: progression._id,
                    },
                  ]);
                }}
              >
                {progression.numerals}
              </p>
            ))}
          </div>
        </div>
        {selectedProgressions.length ? (
          <div>
            {" "}
            Selected progressions:
            {selectedProgressions.map((progression) => (
              <ul key={progression.id}>
                <li>{progression.progression}</li>
              </ul>
            ))}
          </div>
        ) : (
          "Select progressions!"
        )}
        <button type="submit" className="btn btn-primary btn-round">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ProgressionToGenre;
