import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

export interface FileValidationOptions {
  maxSize?: number;
  allowedMimeTypes?: string[];
}

@Injectable()
export class FileValidationPipe implements PipeTransform {
  constructor(private options: FileValidationOptions = {}) {
    this.options = {
      maxSize: 5 * 1024 * 1024, // Default 5MB
      allowedMimeTypes: ['image/jpeg', 'image/png', 'image/gif'], // Default allowed types
      ...options
    };
  }

  transform(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('File is required');
    }

    // Check file size
    if (file.size > this.options.maxSize) {
      throw new BadRequestException(
        `File size should not exceed ${this.options.maxSize / (1024 * 1024)}MB`
      );
    }

    // Check mime type
    if (!this.options.allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        `File type not allowed. Allowed types: ${this.options.allowedMimeTypes.join(', ')}`
      );
    }

    return file;
  }
}