import express from "express";
import { ExecutionParams } from "subscriptions-transport-ws";
import auth from "../constants/auth";
import { LOGIN } from "../modules/auth/test";
import { IUser } from "../modules/user/interface";
import context from "./context";

let user = {} as IUser;
let token = "" as string;

beforeAll(async () => {
  const response = await LOGIN(auth.email, auth.password);
  user = response.user;
  token = response.token;
});

describe("Context", () => {
  it("should success", async () => {
    const req = ({ headers: { authorization: token } } as express.Request);
    const res = ({} as express.Response);
    const result = await context({ req, res });
    expect(result.req).toEqual(req);
    expect(result.res).toEqual(res);
    expect(result.token).toEqual(token);
    expect(result.user.email).toEqual(auth.email);
  });
  it("should success with return connection context", async () => {
    const connection = { context: { user, token } } as ExecutionParams;
    const req = ({} as express.Request);
    const res = ({} as express.Response);
    const result = await context({ connection, res, req });
    expect(result.user.email).toEqual(auth.email);
    expect(result.token).toEqual(token);
  });
});
