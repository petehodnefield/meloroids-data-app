import { gql } from "@apollo/client";

export const TEST = gql`
  query Query {
    artists {
      _id
      name
      age
      image
    }
  }
`;
