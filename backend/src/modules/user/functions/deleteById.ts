import { errors } from 'graphql-response-parser';
import { auth } from '../../../vendors/firebase';

export default (uid: string): Promise<void> => auth.deleteUser(uid).catch((e) => { throw errors(e); });
