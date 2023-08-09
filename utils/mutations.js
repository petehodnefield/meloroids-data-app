import { gql } from "@apollo/client";

export const ALBUM_TO_ARTIST = gql`
  mutation Mutation($id: ID!, $albumId: ID!) {
    addAlbumToArtist(_id: $id, album_id: $albumId) {
      _id
      name
      age
      image
      albums {
        _id
        album_name
        artwork
        year
        popularity
      }
    }
  }
`;

export const CREATE_SONG = gql`
  mutation Mutation(
    $songName: String!
    $tempo: Int!
    $progressionId: ID!
    $albumId: ID!
    $keyId: ID!
  ) {
    createSong(
      song_name: $songName
      tempo: $tempo
      progression_id: $progressionId
      album_id: $albumId
      key_id: $keyId
    ) {
      _id
      song_name
      tempo
      popularity
    }
  }
`;

export const PROGRESSION_TO_GENRE = gql`
  mutation Mutation($id: ID!, $progressionId: ID!) {
    updateGenre(_id: $id, progression_id: $progressionId) {
      _id
      genre
      progressions {
        _id
        numerals

        is_major
      }
    }
  }
`;

export const DELETE_ALBUM = gql`
  mutation Mutation($id: ID!) {
    deleteAlbum(_id: $id) {
      _id
      album_name
      artwork
      year
      popularity
    }
  }
`;

export const ALL_KEYS = gql`
  query Query {
    keys {
      _id
      key
      is_major
    }
  }
`;
