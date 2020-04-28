import gql from 'graphql-tag';

export default gql`
  input CouplesInput {
    id: ID
    limit: Int
    offset: Int
  }
  input CoupleInput {
    id: ID
  }

  type Couple {
    id: ID
    husband_id: String
    wife_id: String

    date_of_marriage: String
    date_of_divorce: String

    createdAt: Date
    updatedAt: Date

    children: [Children]
    husband: People
    wife: People
  }

  type CouplesResponse {
    edges: [Couple]
    message: String
    pageInfo: PageInfo
    totalCount: Int
  }

  extend type Query {
    couples(input: CouplesInput): CouplesResponse
    couple(input: CoupleInput): Couple
  }
`;
