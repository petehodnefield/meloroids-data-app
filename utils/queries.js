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

export const ALL_GENRES = gql`
  query Query {
    genres {
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

export const ALL_PROGRESSIONS = gql`
  query Query {
    progressions {
      _id
      numerals
      is_major
      all_keys {
        _id
        key
        progression_in_key
        midi_file
      }
    }
  }
`;
export const ARTIST_ALL_SONGS = gql`
  query Artistallsongs($name: String!) {
    artistallsongs(name: $name) {
      _id
      name
      age
      image
      songs {
        _id
        song_name
        tempo
        key {
          _id
          key
          is_major
        }
        progression {
          _id
          numerals
          is_major
        }
      }
    }
  }
`;

export const ARTIST_BY_NAME = gql`
  query Artist($name: String!) {
    artist(name: $name) {
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
      songs {
        _id
        song_name
        tempo
        key {
          _id
          key
          is_major
        }
        popularity
        progression {
          _id
          numerals
          is_major
        }
      }
    }
  }
`;

export const ALBUM = gql`
  query Album($albumId: ID!) {
    album(id: $albumId) {
      _id
      album_name
      artwork
      year
      popularity
      songs {
        _id
        song_name
        tempo
        progression {
          _id
          numerals
          is_major
        }
        key {
          is_major
          _id
          key
        }
      }
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

export const GENRE = gql`
  query Genre($genreId: ID!) {
    genre(id: $genreId) {
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
