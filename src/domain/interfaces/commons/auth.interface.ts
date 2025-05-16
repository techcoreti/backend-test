export interface ISignInRequest {
  username: string;
  password: string;
}

export interface ISignOutRequest {
  userId: string;
}

export interface ISignInResponse {
  tokenJwt: string;
  expires: number;
  refreshTokenJwt: string;
}
