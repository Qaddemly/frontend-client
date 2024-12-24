export interface IError {
  status: string;
  name: string;
  message: string;
  details: string;
}

export interface IResponse {
  success: boolean;
  message: string;
}
