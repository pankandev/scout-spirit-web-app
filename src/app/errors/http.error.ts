import {AppError} from './app.error';

export class HttpError extends AppError {
  constructor(public readonly statusCode: number, message?: string) {
    super(message ?? `HTTP error with code: ${statusCode}`);
  }

  public static factory(statusCode: number, message?: string): HttpError {
    switch (statusCode) {
      case 400:
        return new InvalidError(message);
      case 401:
        return new UnauthorizedError(message);
      case 403:
        return new ForbiddenError(message);
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

export class InvalidError extends HttpError {
  constructor(message = 'Bad request') {
    super(400, message);
  }
}

export class ForbiddenError extends HttpError {
  constructor(message = 'Forbidden') {
    super(403, message);
  }
}

export class UnauthorizedError extends HttpError {
  constructor(message = 'Unauthorized') {
    super(401, message);
  }
}
