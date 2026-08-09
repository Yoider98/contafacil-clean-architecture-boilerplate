export class ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;

  constructor(success: boolean, message: string, data?: T) {
    this.success = success;
    this.message = message;
    this.data = data;
  }

  static success<T>(data: T, message = 'Operación exitosa'): ApiResponse<T> {
    return new ApiResponse(true, message, data);
  }

  static error<T = unknown>(message: string): ApiResponse<T> {
    return new ApiResponse<T>(false, message);
  }
}
