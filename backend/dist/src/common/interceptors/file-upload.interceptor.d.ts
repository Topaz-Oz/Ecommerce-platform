import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
export declare class FileUploadInterceptor implements NestInterceptor {
    private options;
    constructor(options?: {
        maxSize?: number;
        allowedMimeTypes?: string[];
        required?: boolean;
    });
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
    private validateFile;
}
