import { gql } from "@apollo/client";

export const ALL_ARTISTS = gql`
  query Query {
    artists {
      _id
      name
      age
      image
      albums {
        _id
        album_name
        year
        artwork
      }
    }
  }
`;
export const ALL_SONGS = gql`
  query Query {
    songs {
      _id
      song_name
      tempo
      progression {
        _id
        numerals
        is_major
        all_keys {
          _id
          key
          progression_in_key
        }
      }
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
