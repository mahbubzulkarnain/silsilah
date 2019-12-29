export interface IUser {
  displayName?: string;
  email: string;
  phoneNumber?: string;
  photoURL?: string;
  providerId?: string;
  uid: string;
}

export interface IUserInput {
  limit?: number;
  pageToken?: string;
}
