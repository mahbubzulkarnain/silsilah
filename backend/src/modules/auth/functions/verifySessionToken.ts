import admin from 'firebase-admin';
import { auth } from '../../../vendors/firebase';

import DecodedIdToken = admin.auth.DecodedIdToken;

export default (token: string): Promise<DecodedIdToken> => auth
  .verifySessionCookie(token, true)
  .catch(() => { throw new Error('You are not authorized'); });
