import { auth } from "../../../vendors/firebase";

const parser = (idToken: string) => (idToken || "").replace("Bearer", "").trimLeft();

export default async (idToken: string, checkRevoked?: boolean): Promise<any> =>
  await auth.verifyIdToken(parser(idToken), checkRevoked).catch(() => ({ email: "", uid: "" }));
