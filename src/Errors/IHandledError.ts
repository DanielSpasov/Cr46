export interface IHandledError {
  type?: string;
  message: string;
  error_code: number | string;
  isAxiosError?: boolean;
  response?: {
    data?: {
      status?: {
        status_code?: string | number;
        message?: string | number;
      };
    };
  };
}
