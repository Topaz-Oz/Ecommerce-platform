import { PipeTransform } from '@nestjs/common';
export interface FileValidationOptions {
    maxSize?: number;
    allowedMimeTypes?: string[];
}
export declare class FileValidationPipe implements PipeTransform {
    private options;
    constructor(options?: FileValidationOptions);
    transform(file: Express.Multer.File): Express.Multer.File;
}
