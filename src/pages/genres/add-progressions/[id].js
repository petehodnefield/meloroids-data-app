import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_GENRE } from "../../../../utils/mutations";
import {
  GENRE,
  ALL_PROGRESSIONS,
  GENRE_FILTERED_PROGRESSIONS,
} from "../../../../utils/queries";
import { initializeApollo } from "../../../../lib/apollo";

const AddProgressions = ({ queryID }) => {
  const [genre, setGenre] = useState({
    genreName: "",
    progressions: [],
    progressionIds: [],
  });
  console.log("genres", genre);
  const [progressions, setProgressions] = useState();
  const [addProgressionToGenre, setAddProgressionToGenre] = useState([]);
  const [filteredProgressions, setFilteredProgressions] = useState();
  // console.log("filteredProgressions", filteredProgressions);
  const { data: progressionsData } = useQuery(ALL_PROGRESSIONS);
  const { data: genreData } = useQuery(GENRE, {
    variables: { genreId: queryID.id },
  });
  const { data: filteredProgressionsData } = useQuery(
    GENRE_FILTERED_PROGRESSIONS,
    {
      variables: { progressionId: genre.progressionIds },
    }
  );
  const [updateGenre] = useMutation(UPDATE_GENRE);
  useEffect(() => {
    if (
      !progressionsData ||
      progressionsData.progressions === null ||
      !genreData ||
      genreData.genre === null
    ) {
      return;
    } else {
      const genre = genreData.genre;
      const progressionIdArray = [];
      const getIds = genre.progressions.forEach((progression) =>
        progressionIdArray.push(progression._id)
      );
      setGenre({
        ...genre,
        genreName: genre.genre,
        progressions: genre.progressions,
        progressionIds: progressionIdArray,
      });
      const progressions = progressionsData.progressions;
      // Only set progressions that don't already exist yet in selected genre

      setProgressions(progressions);
    }
  }, [progressionsData, genreData]);

  useEffect(() => {
    if (!filteredProgressionsData) {
      return;
    } else {
      console.log("data", filteredProgressionsData);
      setFilteredProgressions(
        filteredProgressionsData.genrefilteredprogressions
      );
    }
  }, [filteredProgressionsData]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const addEveryProgressions = await addProgressionToGenre.forEach(
        (progression) =>
          updateGenre({
            variables: {
              id: queryID.id,
              progressionId: progression._id,
            },
          })
      );
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="container">
      {/* Current progressions for genre */}
      <div className="container--row">
        <h2>Current progressions</h2>
        <div className="card">
          {genre.progressions
            ? genre.progressions.map((progressions) => (
                <div
                  className="card__row"
                  key={`${progressions.numerals} ${progressions.key}`}
                >
                  <div>{progressions.numerals}</div>
                  <div className="card__row-action-wrapper">
                    <p className="card__row-action">Remove</p>
                  </div>
                </div>
              ))
            : ""}
        </div>
      </div>
      <div className="container--row">
        <div>
          <h1>Add progressions to {genre.genreName}</h1>
          <div className="card card--lg card--overflow">
            {filteredProgressions
              ? filteredProgressions.map((progression) => (
                  <div
                    key={`${progression.numeral}${progression._id}`}
                    className="card__row"
                    onClick={() =>
                      setAddProgressionToGenre([
                        ...addProgressionToGenre,
                        progression,
                      ])
                    }
                  >
                    {progression.numerals}
                  </div>
                ))
              : ""}
          </div>
          <form onSubmit={(e) => handleFormSubmit(e)}>
            <button type="submit" className="btn btn-primary rounded">
              Submit
            </button>
          </form>
        </div>
        {addProgressionToGenre ? (
          <div>
            <h2>Selected Progressions:</h2>

            {addProgressionToGenre.map((progression) => (
              <div className="card__row">{progression.numerals}</div>
            ))}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default AddProgressions;
export const getServerSideProps = async ({ query }) => {
  const queryID = query;
  const apolloClient = initializeApollo();
  await apolloClient.query({
    query: GENRE,
    variables: { genreId: queryID.id },
  });

  return {
    props: { initializeApolloState: apolloClient.cache.extract(), queryID },
  };
};
