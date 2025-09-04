export interface ILogin {
  email: string;
  password: string;
}

export interface Data {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  auth: Auth[];
  isActive: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  isVerified: boolean;
}

export interface Auth {
  provider: string;
  providerId: string;
}

export interface ISendOTP {
  email: string;
}
