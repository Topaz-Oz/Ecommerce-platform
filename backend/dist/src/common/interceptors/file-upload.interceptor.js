"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUploadInterceptor = void 0;
const common_1 = require("@nestjs/common");
const cloudinary_constants_1 = require("../../modules/cloudinary/cloudinary.constants");
let FileUploadInterceptor = class FileUploadInterceptor {
    constructor(options = {}) {
        this.options = options;
        this.options = Object.assign({ maxSize: cloudinary_constants_1.FILE_VALIDATION.MAX_SIZE, allowedMimeTypes: cloudinary_constants_1.FILE_VALIDATION.ALLOWED_MIME_TYPES, required: true }, options);
    }
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const file = request.file;
        const files = request.files;
        if (this.options.required && !file && !files) {
            throw new common_1.BadRequestException('File is required');
        }
        if (file) {
            this.validateFile(file);
        }
        if (files) {
            if (Array.isArray(files)) {
                files.forEach(this.validateFile.bind(this));
            }
            else {
                Object.values(files).flat().forEach(this.validateFile.bind(this));
            }
        }
        return next.handle();
    }
    validateFile(file) {
        if (file.size > this.options.maxSize) {
            throw new common_1.BadRequestException(`File size (${file.size} bytes) exceeds maximum size of ${this.options.maxSize} bytes`);
        }
        if (!this.options.allowedMimeTypes.includes(file.mimetype)) {
            throw new common_1.BadRequestException(`File type ${file.mimetype} is not allowed. Allowed types: ${this.options.allowedMimeTypes.join(', ')}`);
        }
    }
};
exports.FileUploadInterceptor = FileUploadInterceptor;
exports.FileUploadInterceptor = FileUploadInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], FileUploadInterceptor);
//# sourceMappingURL=file-upload.interceptor.js.map