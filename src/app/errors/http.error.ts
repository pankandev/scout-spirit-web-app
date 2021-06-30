import {AppError} from './app.error';

export class HttpError extends AppError {
  constructor(public endpoint: string, public readonly statusCode: number, message?: string) {
    super(message ?? `HTTP error with code: ${statusCode} while calling ${endpoint}`);
  }

  public static factory(endpoint: string, statusCode: number, message?: string, payload?: object): HttpError {
    switch (statusCode) {
      case 400:
        return new InvalidError(endpoint, message);
      case 401:
        return new UnauthorizedError(endpoint, message);
      case 403:
        return new ForbiddenError(endpoint, message);
      case 404:
        return new NotFoundError(endpoint, message);
      case 500:
        return new ServerError(endpoint, payload ?? {});
      default:
        return new HttpError(endpoint, statusCode, message);
    }
  }
}

export class NotFoundError extends HttpError {
  constructor(endpoint: string, message = 'Item not found') {
    super(endpoint, 404, message);
  }
}

export class InvalidError extends HttpError {
  constructor(endpoint: string, message = 'Bad request') {
    super(endpoint, 400, message);
  }
}

export class ForbiddenError extends HttpError {
  constructor(endpoint: string, message = 'Forbidden') {
    super(endpoint, 403, message);
  }
}

export class UnauthorizedError extends HttpError {
  constructor(endpoint: string, message = 'Unauthorized') {
    super(endpoint, 401, message);
  }
}

export class ServerError extends HttpError {
  constructor(endpoint: string, private payload: object) {
    super(endpoint, 401, `An unknown error was returned from the server with payload: ${JSON.stringify(payload)}`);
  }
}
