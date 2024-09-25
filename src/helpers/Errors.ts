import { AxiosError } from 'axios';
import { ErrorResponse } from 'src/interfaces/ErrorResponse';

export function handleError(error: unknown): string[] {
  return getMessagesFromUnknownError(error);
}

export function getMessagesFromUnknownError(error: unknown): string[] {
  if ((error as AxiosError)?.isAxiosError) {
    return getMessagesFromAxiosError(error as AxiosError);
  }

  if (error instanceof Error) {
    return [error.message];
  }

  if (Array.isArray(error) && typeof error[0] === 'string') {
    return error;
  }

  return ['Erro desconhecido'];
}

export function getMessagesFromAxiosError(error: AxiosError): string[] {
  const body = error.response?.data as ErrorResponse;

  if (body?.objects && Array.isArray(body.objects)) {
    return body.objects.map((obj) => `${obj.name}: ${obj.userMessage}`);
  }

  if (body?.errors && Array.isArray(body.errors)) {
    return body.errors;
  }

  if (body?.message) {
    return [body.message];
  }

  if (body?.error) {
    return [body.error];
  }

  return ['Erro desconhecido no servidor'];
}
