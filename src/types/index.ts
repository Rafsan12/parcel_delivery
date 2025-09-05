import type { Data } from "./auth.type";

export type { ILogin, ISendOTP, IVerifyOTP } from "./auth.type";

export interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}

export interface ILoginResponse {
  data: Data;
}
