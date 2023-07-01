type ApiResponseModel<T> = {
  success: boolean;
  message: string;
  content?: T;
};

export type { ApiResponseModel };
