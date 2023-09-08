import React, { useState, useEffect } from "react";
import style from "@/styles/Genre.module.css";
import { useMutation, useQuery } from "@apollo/client";
import {
  UPDATE_GENRE,
  REMOVE_PROGRESSION_FROM_GENRE,
} from "../../../../utils/mutations";
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
  const [progressions, setProgressions] = useState();
  const [addProgressionToGenre, setAddProgressionToGenre] = useState([]);
  const [filteredProgressions, setFilteredProgressions] = useState();
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
  const [removeProgressionFromGenre] = useMutation(
    REMOVE_PROGRESSION_FROM_GENRE
  );
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
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };

  const handleProgressionRemove = async (genreId, progressionId) => {
    const confirmRemove = window.confirm(
      "Are you sure you want to remove this progression?"
    );
    if (confirmRemove) {
      try {
        await removeProgressionFromGenre({
          variables: {
            id: genreId,
            progressionId: progressionId,
          },
        });
        window.location.reload();
      } catch (e) {
        console.log(e);
      }
    } else {
      return;
    }
  };
  return (
    <div className="container">
      {/* Current progressions for genre */}
      <div className="container--row">
        <div className={style.currentProgressionsContainer}>
          <h2 className={`title--md`}>Current progressions</h2>
          <div className={`card `}>
            {genre.progressions
              ? genre.progressions.map((progressions) => (
                  <div
                    className="card__row"
                    key={`${progressions.numerals} ${progressions.key}`}
                  >
                    <div>{progressions.numerals}</div>
                    <div className="card__row-action-wrapper">
                      <p
                        className="card__row-action"
                        onClick={() =>
                          handleProgressionRemove(genre._id, progressions._id)
                        }
                      >
                        Remove
                      </p>
                    </div>
                  </div>
                ))
              : ""}
          </div>
        </div>
        <div className={`${style.addProgressionContainer}`}>
          <h1 className={`title--lg`}>Add progressions to {genre.genreName}</h1>
          <div className={`card ${style.progressionCard}`}>
            {filteredProgressions
              ? filteredProgressions.map((progression) => (
                  <div
                    key={`${progression.numeral}${progression._id}`}
                    className="card__row"
                    onClick={() => {
                      setAddProgressionToGenre([
                        ...addProgressionToGenre,
                        progression,
                      ]);
                      setFilteredProgressions(
                        filteredProgressions.filter(
                          (a) => a._id !== progression._id
                        )
                      );
                    }}
                  >
                    {progression.numerals}
                  </div>
                ))
              : ""}
          </div>
          <form
            onSubmit={(e) => handleFormSubmit(e)}
            className={`${style.addProgressionForm}`}
          >
            <button
              type="submit"
              className={`btn btn-primary rounded ${style.submitBtn}`}
            >
              Submit
            </button>
          </form>
        </div>
        {addProgressionToGenre ? (
          <div className={`${style.addProgressionContainer}`}>
            <h2 className={`title--md`}>Selected Progressions:</h2>

            {addProgressionToGenre.map((progression) => (
              <div className="card__row">
                {progression.numerals}
                <p
                  className="card__row-action"
                  onClick={() => {
                    setAddProgressionToGenre(
                      addProgressionToGenre.filter(
                        (a) => a._id !== progression._id
                      )
                    );
                  }}
                >
                  Remove
                </p>
              </div>
            ))}
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="container--row"></div>
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
