import {AppError} from './app.error';

export class HttpError extends AppError {
  constructor(public readonly statusCode: number, message?: string) {
    super(message ?? `HTTP error with code: ${statusCode}`);
  }

  public static factory(statusCode: number, message?: string): HttpError {
    switch (statusCode) {
      case 404:
        return new NotFoundError(message);
      default:
        return new HttpError(statusCode, message);
    }
  }
}

export class NotFoundError extends HttpError {
  constructor(message = 'Item not found') {
    super(404, message);
  }
}
