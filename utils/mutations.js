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

export const SONG_TO_ALBUM = gql`
  mutation Mutation($id: ID!, $songId: ID!) {
    updateAlbum(_id: $id, song_id: $songId) {
      _id
      album_name
      artwork
      year
      popularity
      songs {
        _id
        song_name
        tempo
        popularity
      }
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
