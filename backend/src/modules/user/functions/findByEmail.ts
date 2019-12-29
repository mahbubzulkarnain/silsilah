import * as admin from "firebase-admin";
import { auth } from "../../../vendors/firebase";
import UserRecord = admin.auth.UserRecord;

export default (email: string): Promise<UserRecord> => auth.getUserByEmail(email);
