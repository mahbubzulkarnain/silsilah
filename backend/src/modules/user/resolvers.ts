import { errors, response } from 'graphql-response-parser';
import { IContext } from '../../interfaces/IContext';
import { IResponse } from '../../interfaces/IResponse';
import { IUser } from './interface';

export default {
  User : {
    displayName : (user: IUser): string => user.displayName,
    email       : (user: IUser): string => user.email,
    phoneNumber : (user: IUser): string => user.phoneNumber,
    photoURL    : (user: IUser): string => user.photoURL,
  },

  Mutation : {},
  Query    : {
    me : async (
      source,
      props,
      { user, dataSources: { userAPI } }: IContext,
    ): Promise<IResponse | Error> => {
      try {
        return response(await userAPI.getById(user.uid));
      } catch (e) {
        throw errors(e);
      }
    },
  },
};
