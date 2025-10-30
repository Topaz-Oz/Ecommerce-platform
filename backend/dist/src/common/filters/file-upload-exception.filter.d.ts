import { ExceptionFilter, ArgumentsHost, HttpException } from '@nestjs/common';
import { MulterError } from 'multer';
export declare class FileUploadExceptionFilter implements ExceptionFilter {
    private readonly logger;
    catch(exception: MulterError | HttpException, host: ArgumentsHost): void;
}
