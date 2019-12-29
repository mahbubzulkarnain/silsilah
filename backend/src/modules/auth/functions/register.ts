import * as admin from "firebase-admin";
import { errors } from "graphql-response-parser";
import { auth } from "../../../vendors/firebase";
import CreateRequest = admin.auth.CreateRequest;
import UserRecord = admin.auth.UserRecord;

export default async (props: CreateRequest): Promise<UserRecord | Error> =>
  await auth.createUser(props).catch(errors);
