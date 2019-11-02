import { gql } from 'apollo-server';

const Scalar = gql`
  scalar Date
  scalar UUID
  scalar JSON
  scalar JSONObject
`;

export default Scalar;
