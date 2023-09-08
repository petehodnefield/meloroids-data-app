import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { ARTIST_ALL_SONGS } from "../../../utils/queries";
import { initializeApollo } from "../../../lib/apollo";
const ArtistSongs = ({ queryName }) => {
  const selectedArtist = queryName.params[0];
  const [allSongs, setAllSongs] = useState([]);
  const { loading, data, error } = useQuery(ARTIST_ALL_SONGS, {
    variables: { name: selectedArtist },
  });
  useEffect(() => {
    if (!data || !data.artistallsongs) {
      return;
    } else {
      const dataSongs = data.artistallsongs.songs;
      setAllSongs([...allSongs, dataSongs]);
    }
  }, [data]);
  return (
    <div>
      {allSongs.map((song) => (
        <div key={song}>{song}</div>
      ))}
    </div>
  );
};

export default ArtistSongs;

export const getServerSideProps = async ({ query }) => {
  const queryName = query;
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: ARTIST_ALL_SONGS,
    variables: { name: queryName.params[0] },
  });

  return {
    props: { initializeApolloState: apolloClient.cache.extract(), queryName },
  };
};
