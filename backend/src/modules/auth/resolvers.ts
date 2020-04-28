import { auth } from 'firebase-admin';
import login from './functions/login';
import register from './functions/register';
import { ILoginResponse } from './interface';

export default {
  Mutation : {
    login    : (obj, { input: { email, password } }): Promise<ILoginResponse> => login(email, password),
    register : (obj, { input }): Promise<auth.UserRecord | Error> => register(input),
  },
};
