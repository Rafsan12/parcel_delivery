import type { ComponentType } from "react";
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
  success: boolean;
}

export interface ISidebarItems {
  title: string;
  items: {
    title: string;
    url: string;
    component: ComponentType;
  }[];
}

export type TRole = "SUPER_ADMIN" | "ADMIN" | "SENDER" | "RECEIVER";
