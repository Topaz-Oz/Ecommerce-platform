import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import { MulterError } from 'multer';

@Catch(MulterError, HttpException)
export class FileUploadExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(FileUploadExceptionFilter.name);

  catch(exception: MulterError | HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.BAD_REQUEST;
    let message = 'File upload failed';
    let error = 'Bad Request';

    if (exception instanceof MulterError) {
      switch (exception.code) {
        case 'LIMIT_FILE_SIZE':
          message = 'File size is too large';
          break;
        case 'LIMIT_FILE_COUNT':
          message = 'Too many files';
          break;
        case 'LIMIT_UNEXPECTED_FILE':
          message = 'Unexpected field';
          break;
        default:
          message = 'File upload error';
      }
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      
      if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        message = (exceptionResponse as any).message || message;
        error = (exceptionResponse as any).error || error;
      } else {
        message = exceptionResponse as string;
      }
    }

    // Log the error
    this.logger.error(`File upload error: ${message}`, exception.stack);

    response.status(status).json({
      statusCode: status,
      message,
      error,
      timestamp: new Date().toISOString(),
    });
  }
}