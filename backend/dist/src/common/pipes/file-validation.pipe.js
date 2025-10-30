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
exports.FileValidationPipe = void 0;
const common_1 = require("@nestjs/common");
let FileValidationPipe = class FileValidationPipe {
    constructor(options = {}) {
        this.options = options;
        this.options = Object.assign({ maxSize: 5 * 1024 * 1024, allowedMimeTypes: ['image/jpeg', 'image/png', 'image/gif'] }, options);
    }
    transform(file) {
        if (!file) {
            throw new common_1.BadRequestException('File is required');
        }
        if (file.size > this.options.maxSize) {
            throw new common_1.BadRequestException(`File size should not exceed ${this.options.maxSize / (1024 * 1024)}MB`);
        }
        if (!this.options.allowedMimeTypes.includes(file.mimetype)) {
            throw new common_1.BadRequestException(`File type not allowed. Allowed types: ${this.options.allowedMimeTypes.join(', ')}`);
        }
        return file;
    }
};
exports.FileValidationPipe = FileValidationPipe;
exports.FileValidationPipe = FileValidationPipe = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], FileValidationPipe);
//# sourceMappingURL=file-validation.pipe.js.map