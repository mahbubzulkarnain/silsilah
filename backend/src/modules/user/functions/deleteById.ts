import { errors } from "graphql-response-parser";
import { auth } from "../../../vendors/firebase";

export default (uid: string): Promise<void | Error> => auth.deleteUser(uid).catch(errors);
