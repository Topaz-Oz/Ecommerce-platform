"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryService = void 0;
const common_1 = require("@nestjs/common");
const cloudinary_1 = require("cloudinary");
const streamifier = require("streamifier");
let CloudinaryService = class CloudinaryService {
    async uploadFile(file, options = {}) {
        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary_1.v2.uploader.upload_stream(options, (error, result) => {
                if (error)
                    return reject(error);
                resolve(result);
            });
            streamifier.createReadStream(file.buffer).pipe(uploadStream);
        });
    }
    async uploadFromPath(path, options = {}) {
        try {
            return await cloudinary_1.v2.uploader.upload(path, options);
        }
        catch (error) {
            console.error('Lỗi upload từ path:', error);
            throw error;
        }
    }
    async deleteFile(publicId) {
        return cloudinary_1.v2.uploader.destroy(publicId);
    }
    getPublicIdFromUrl(imageUrl) {
        try {
            const regex = /upload\/(?:v\d+\/)?(.*?)\.[^.]+$/;
            const match = imageUrl.match(regex);
            return match ? match[1] : null;
        }
        catch (error) {
            console.error('Error parsing public_id from URL:', error);
            return null;
        }
    }
};
exports.CloudinaryService = CloudinaryService;
exports.CloudinaryService = CloudinaryService = __decorate([
    (0, common_1.Injectable)()
], CloudinaryService);
//# sourceMappingURL=cloudinary.service.js.map