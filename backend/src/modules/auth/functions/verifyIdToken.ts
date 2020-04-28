import admin from 'firebase-admin';
import { auth } from '../../../vendors/firebase';
import { IUser } from '../../user/interface';

const parser = (idToken: string): string => (idToken || '').replace('Bearer', '').trimLeft();

export default async (
  idToken: string, checkRevoked?: boolean,
): Promise<admin.auth.DecodedIdToken | IUser> => auth
  .verifyIdToken(parser(idToken), checkRevoked)
  .catch(() => ({ email: '', uid: '' }));
