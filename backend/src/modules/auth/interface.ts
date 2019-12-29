export interface ILoginResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered: boolean;
}

export interface IAuthInput {
  email: string;
  password: string;
}
