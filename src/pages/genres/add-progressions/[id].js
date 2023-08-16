import React, { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_GENRE } from "../../../../utils/mutations";
import { GENRE, ALL_PROGRESSIONS } from "../../../../utils/queries";
import { initializeApollo } from "../../../../lib/apollo";

const AddProgressions = ({ queryID }) => {
  const [genre, setGenre] = useState();
  const [progressions, setProgressions] = useState();
  const [addProgressionToGenre, setAddProgressionToGenre] = useState([]);
  console.log("addProgression", addProgressionToGenre);
  const { data: progressionsData } = useQuery(ALL_PROGRESSIONS);
  const { data: genreData } = useQuery(GENRE, {
    variables: { genreId: queryID.id },
  });
  useEffect(() => {
    if (!genreData || genreData.genre === null) {
      return;
    } else {
      const genre = genreData.genre;
      setGenre(genre.genre);
    }
  }, [genreData]);
  useEffect(() => {
    if (!progressionsData || progressionsData.progressions === null) {
      return;
    } else {
      const progressions = progressionsData.progressions;
      setProgressions(progressions);
    }
  }, [progressionsData]);
  return (
    <div className="container">
      <div className="container--row">
        <div>
          <h1>Add progressions to {genre}</h1>
          <div className="card card--lg card--overflow">
            {progressions
              ? progressions.map((progression) => (
                  <div
                    onClick={() =>
                      setAddProgressionToGenre([
                        ...addProgressionToGenre,
                        progression,
                      ])
                    }
                    className="card__row"
                    key={progression._id}
                  >
                    <div>{progression.numerals}</div>
                  </div>
                ))
              : ""}
          </div>
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
