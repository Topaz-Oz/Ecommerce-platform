"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var FileUploadExceptionFilter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUploadExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const multer_1 = require("multer");
let FileUploadExceptionFilter = FileUploadExceptionFilter_1 = class FileUploadExceptionFilter {
    constructor() {
        this.logger = new common_1.Logger(FileUploadExceptionFilter_1.name);
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        let status = common_1.HttpStatus.BAD_REQUEST;
        let message = 'File upload failed';
        let error = 'Bad Request';
        if (exception instanceof multer_1.MulterError) {
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
        }
        else if (exception instanceof common_1.HttpException) {
            status = exception.getStatus();
            const exceptionResponse = exception.getResponse();
            if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
                message = exceptionResponse.message || message;
                error = exceptionResponse.error || error;
            }
            else {
                message = exceptionResponse;
            }
        }
        this.logger.error(`File upload error: ${message}`, exception.stack);
        response.status(status).json({
            statusCode: status,
            message,
            error,
            timestamp: new Date().toISOString(),
        });
    }
};
exports.FileUploadExceptionFilter = FileUploadExceptionFilter;
exports.FileUploadExceptionFilter = FileUploadExceptionFilter = FileUploadExceptionFilter_1 = __decorate([
    (0, common_1.Catch)(multer_1.MulterError, common_1.HttpException)
], FileUploadExceptionFilter);
//# sourceMappingURL=file-upload-exception.filter.js.map