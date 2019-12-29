import { auth } from "../../../vendors/firebase";

export default (token: string) => new Promise(async (resolve, reject) => {
  try {
    return resolve(await auth.verifySessionCookie(token, true));
  } catch (e) {
    return reject(new Error("You are not authorized"));
  }
});
