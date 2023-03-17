import { gql } from "@apollo/client";

export const ALL_ARTISTS = gql`
  query Query {
    artists {
      _id
      name
      age
      image
    }
  }
`;

export const ALL_ALBUMS = gql`
  query Query {
    albums {
      _id
      album_name
      artwork
      year
      popularity
      songs {
        _id
        song_name
      }
      artist {
        _id
        name
      }
    }
  }
`;
