import * as admin from "firebase-admin";
import { auth } from "../../../vendors/firebase";
import UserRecord = admin.auth.UserRecord;

export default (uid: string): Promise<UserRecord> => auth.getUser(uid);
