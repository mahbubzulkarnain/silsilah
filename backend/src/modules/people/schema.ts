import gql from 'graphql-tag';

export default gql`
  input PeoplesInput {
    id: ID
    limit: Int
    offset: Int
  }
  input PeopleInput {
    id: ID
  }

  type People {
    id: ID

    address: String
    blood_type: String
    date_of_birth: String
    date_of_death: String
    email: String
    gender: String
    nick_name: String
    phone: String
    profile_picture: String
    sure_name: String

    createdAt: Date
    updatedAt: Date

    couples: [Couple]
    parent: Couple
  }

  type PeoplesResponse {
    edges: [People]
    message: String
    pageInfo: PageInfo
    totalCount: Int
  }

  extend type Query {
    peoples(input: PeoplesInput): PeoplesResponse
    people(input: PeopleInput): People
  }
`;
