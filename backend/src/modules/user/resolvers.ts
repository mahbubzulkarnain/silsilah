import { errors, response } from "graphql-response-parser";
import { IContext } from "../../interfaces/IContext";
import { IResponse } from "../../interfaces/IResponse";
import { IUser } from "./interface";

export default {
  User: {
    displayName: (user: IUser) => user.displayName,
    email      : (user: IUser) => user.email,
    phoneNumber: (user: IUser) => user.phoneNumber,
    photoURL   : (user: IUser) => user.photoURL,
  },

  Mutation: {},
  Query   : {
    me: (
      source,
      props,
      { user, dataSources: { userAPI } }: IContext,
    ): Promise<IResponse | Error> => new Promise(async (resolve, reject) => {
      try {
        resolve(response(await userAPI.getById(user.uid)));
      } catch (e) {
        reject(errors(e));
      }
    }),
  },
};
