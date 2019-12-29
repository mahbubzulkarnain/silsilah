import { createTestClient } from "apollo-server-testing";
import gql from "graphql-tag";
import auth from "../../constants/auth";
import constructTestServer from "../../utils/constructTestServer";
import { IUser } from "../user/interface";
import verifyIdToken from "./functions/verifyIdToken";
import { IAuthInput } from "./interface";

export const MUTATION_LOGIN = gql`
    mutation login($input: UserInput!){
        login(input: $input){
            idToken
            email
            refreshToken
            expiresIn
            localId
            registered
        }
    }
`;

export const LOGIN = async (email, password): Promise<{ user: IUser, token: string }> => {
  const server = constructTestServer({});
  const { mutate } = createTestClient(server);
  const input: IAuthInput = { email, password };
  const { data } = await mutate({
    mutation : MUTATION_LOGIN,
    variables: { input },
  });
  const token = data.login.idToken;
  const user = await verifyIdToken(token);

  return { user, token };
};

describe("Mutation", () => {
  it("should success", async () => {
    const { user } = await LOGIN(auth.email, auth.password);
    expect(user.email).toEqual(auth.email);
  });
});
