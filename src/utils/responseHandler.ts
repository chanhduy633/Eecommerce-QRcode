// src/utils/responseHandler.ts

export enum ResponseCode {
  SUCCESS = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  INTERNAL_ERROR = 500,
}

export interface BaseResponse<T= any> {
  code: ResponseCode;
  data?: T;
  message: string;
  errors?: any;
}

export class ResponseHandler {
  static success<T>(data: T, message: string = "Thành công"): BaseResponse<T> {
    return {
      code: ResponseCode.SUCCESS,
      data,
      message,
    };
  }

  static created<T>(data: T, message: string = "Tạo thành công"): BaseResponse<T> {
    return {
      code: ResponseCode.CREATED,
      data,
      message,
    };
  }

  static error<T>(
    code: ResponseCode,
    message: string,
    errors?: any
  ): BaseResponse<T> {
    return {
      code,
      message,
      errors,
    };
  }
}
