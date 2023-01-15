import { Request } from "express";

export interface TokenUser {
  id: number;
}

export interface IRequestAfterMidlware<T = {}> extends Request {
  user: TokenUser;
  body: T;
}

export interface ResponseError {
  message: string;
}

export type IResponseModel<T> = {
  errors: null | ResponseError[];
  data: null | T;
  status: 0 | 1;
};
