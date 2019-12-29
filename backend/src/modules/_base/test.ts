import { createTestClient } from "apollo-server-testing";
import gql from "graphql-tag";
import { IPageInfo, IResponse } from "../../interfaces/IResponse";
import constructTestServer from "../../utils/constructTestServer";

export const PAGE_INFO_RESPONSE: IPageInfo = {
  hasNextPage: expect.any(Boolean),
  hasPrevPage: expect.any(Boolean),
  nextCursor : expect.any(String),
  prevCursor : expect.any(String),
};

export const DEFAULT_LIST_RESPONSE: IResponse = {
  edges     : expect.anything(),
  message   : expect.any(String),
  pageInfo  : PAGE_INFO_RESPONSE,
  totalCount: expect.any(Number),
};

export const TYPE_PAGE_INFO = `
    pageInfo {
      hasNextPage
      hasPrevPage
      nextCursor
      prevCursor
    }
`;

export const QUERY_RESPONSE = `
  message
  ${TYPE_PAGE_INFO}
  totalCount
`;

const PING = `
  ping {
      edges {
          parent
          args
          context
          info
      }
      ${QUERY_RESPONSE}
  }
`;

export const QUERY_PING = gql`
    query {
        ${PING}
    }
`;

export const MUTATION_PING = gql`
    mutation {
        ${PING}
    }
`;

describe("Ping", () => {
  describe("Queries", () => {
    it("should ping success", async () => {
      const server = constructTestServer({});
      const { query } = createTestClient(server);
      const { data, errors } = await query({
        query: QUERY_PING,
      });
      expect(data).toMatchObject({
        ping: DEFAULT_LIST_RESPONSE,
      });
      expect(errors).toEqual(undefined);
    });
  });

  describe("Mutations", () => {
    it("should ping success", async () => {
      const server = constructTestServer({});
      const { mutate } = createTestClient(server);
      const { data, errors } = await mutate({
        mutation: MUTATION_PING,
      });
      expect(data).toMatchObject({
        ping: DEFAULT_LIST_RESPONSE,
      });
      expect(errors).toEqual(undefined);
    });
  });
});
