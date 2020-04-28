import * as admin from 'firebase-admin';
import { errors } from 'graphql-response-parser';
import { auth } from '../../../vendors/firebase';

import UpdateRequest = admin.auth.UpdateRequest;
import UserRecord = admin.auth.UserRecord;

export default (
  uid: string,
  props: UpdateRequest,
): Promise<UserRecord> => auth.updateUser(uid, props).catch((e) => { throw errors(e); });
