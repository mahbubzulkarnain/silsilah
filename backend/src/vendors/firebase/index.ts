import * as admin from "firebase-admin";
import { google } from "googleapis";
import log from "../../utils/log";
import config from "./config";

const firebaseAdmin = admin.initializeApp({
  credential : admin.credential.cert(config),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

export const auth = firebaseAdmin.auth();
export const getAccessToken = new Promise((resolve) => {
  new google.auth.JWT(
    config.clientEmail,
    null,
    config.privateKey,
    ["https://www.googleapis.com/auth/userinfo.email"],
    null,
  ).authorize((err, result) => {
    if (err) {
      log.error(err);
    }
    return resolve(result ? result.access_token || "" : "");
  });
});
export const getAPIKey = process.env.FIREBASE_API_KEY || "";
