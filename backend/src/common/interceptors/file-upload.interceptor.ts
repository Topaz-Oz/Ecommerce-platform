import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { FILE_VALIDATION } from '../../modules/cloudinary/cloudinary.constants';

@Injectable()
export class FileUploadInterceptor implements NestInterceptor {
  constructor(private options: {
    maxSize?: number;
    allowedMimeTypes?: string[];
    required?: boolean;
  } = {}) {
    this.options = {
      maxSize: FILE_VALIDATION.MAX_SIZE,
      allowedMimeTypes: FILE_VALIDATION.ALLOWED_MIME_TYPES,
      required: true,
      ...options,
    };
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const file = request.file;
    const files = request.files;

    if (this.options.required && !file && !files) {
      throw new BadRequestException('File is required');
    }

    if (file) {
      this.validateFile(file);
    }

    if (files) {
      if (Array.isArray(files)) {
        files.forEach(this.validateFile.bind(this));
      } else {
        Object.values(files).flat().forEach(this.validateFile.bind(this));
      }
    }

    return next.handle();
  }

  private validateFile(file: Express.Multer.File) {
    if (file.size > this.options.maxSize) {
      throw new BadRequestException(
        `File size (${file.size} bytes) exceeds maximum size of ${this.options.maxSize} bytes`
      );
    }

    if (!this.options.allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        `File type ${file.mimetype} is not allowed. Allowed types: ${this.options.allowedMimeTypes.join(
          ', '
        )}`
      );
    }
  }
}