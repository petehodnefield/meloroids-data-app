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
