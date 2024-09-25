export interface ErrorObject {
  name: string;
  userMessage: string;
}

export interface ErrorResponse {
  status?: number;
  timestamp?: string;
  type?: string;
  title?: string;
  detail?: string;
  userMessage?: string;
  errors?: string[];
  message?: string;
  error?: string;
  objects?: ErrorObject[];
}
