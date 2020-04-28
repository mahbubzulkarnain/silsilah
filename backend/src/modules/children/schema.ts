import gql from 'graphql-tag';

export default gql`
  input ChildrensInput {
    id: ID
    limit: Int
    offset: Int
  }
  input ChildrenInput {
    id: ID
  }

  type Children {
    id: ID
    parent_id:ID
    child_id: ID

    createdAt: Date
    updatedAt: Date

    child: People
  }

  type ChildrensResponse {
    edges: [Children]
    message: String
    pageInfo: PageInfo
    totalCount: Int
  }

  extend type Query {
    childrens(input: ChildrensInput): ChildrensResponse
    children(input: ChildrenInput): Children
  }
`;
