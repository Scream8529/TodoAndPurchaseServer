import { User } from "@prisma/client";
import { IResponseModel } from "./";

export interface RegistrationData {
  userName: string;
  password: string;
}

export interface RegistrationSucsessResponse {
  message?: string;
  user?: Omit<User, "pass">;
}

export type AuthResponse = IResponseModel<RegistrationSucsessResponse>;

export interface LoginData {
  userName: string;
  password: string;
}
