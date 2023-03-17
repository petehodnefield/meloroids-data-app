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
