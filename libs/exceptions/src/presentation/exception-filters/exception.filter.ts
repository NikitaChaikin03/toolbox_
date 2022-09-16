import { ArgumentsHost, Catch, HttpException, ExceptionFilter, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger('ExceptionFilter');

  public catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const message = exception.message;
    const path = request.url;

    this.logger.error(message, exception.stack, path);

    response.status(status).json({
      error: {
        message,
        path,
        statusCode: status,
      },
    });
  }
}
