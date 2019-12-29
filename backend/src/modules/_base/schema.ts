import gql from "graphql-tag";

export default gql`
  directive @upper on FIELD_DEFINITION

  scalar Date

  type PageInfo {
    hasNextPage: Boolean!
    hasPrevPage: Boolean!
    nextCursor: String
    prevCursor: String
  }

  type PropertyDefaultInput {
    parent: String
    args: String
    context: String
    info: String
  }

  type PingResponse {
    edges: PropertyDefaultInput
    message: String
    pageInfo: PageInfo
    totalCount: Int
  }

  type Query {
    ping: PingResponse
  }
  type Mutation {
    ping: PingResponse
  }
`;
