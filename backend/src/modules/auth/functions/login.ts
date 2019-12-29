import { errors } from "graphql-response-parser";
import axios from "../../../vendors/axios";
import { getAPIKey } from "../../../vendors/firebase";
import { ILoginResponse } from "../interface";

export default (email: string, password: string): Promise<ILoginResponse> =>
  new Promise(
    async (resolve, reject) => {
      try {
        const { data } = await axios
          .post(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${getAPIKey}`, {
              email,
              password,
              returnSecureToken: true,
            },
          );
        return resolve(data);
      } catch (e) {
        return reject(errors(e));
      }
    },
  );
