import { IResponseModel, ResponseError } from "models";

class WraperService {
  successResponse<T>(model: T): IResponseModel<T> {
    return {
      errors: null,
      status: 0,
      data: model,
    };
  }

  errorResponse<T>(errors: ResponseError[]): IResponseModel<T> {
    return {
      errors,
      status: 1,
      data: null,
    };
  }
}

export const wraperService = new WraperService();
