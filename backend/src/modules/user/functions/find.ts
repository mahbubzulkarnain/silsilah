import * as admin from "firebase-admin";
import { auth } from "../../../vendors/firebase";
import ListUsersResult = admin.auth.ListUsersResult;

export default (maxResults: number = 10, pageToken?: string): Promise<ListUsersResult> => auth
  .listUsers(maxResults, pageToken);
