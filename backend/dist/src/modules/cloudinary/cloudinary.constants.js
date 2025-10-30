"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLOUDINARY = exports.FILE_VALIDATION = void 0;
exports.FILE_VALIDATION = {
    MAX_SIZE: 5 * 1024 * 1024,
    ALLOWED_MIME_TYPES: [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/webp',
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ],
};
exports.CLOUDINARY = {
    PROVIDER_TOKEN: 'Cloudinary',
    FOLDER: {
        PRODUCTS: 'products',
        USERS: 'users',
        SELLERS: 'sellers',
        ENTERPRISE: 'enterprise',
        LOGISTICS: 'logistics',
    },
    TRANSFORMATION: {
        THUMBNAIL: {
            width: 150,
            height: 150,
            crop: 'thumb',
        },
        PROFILE: {
            width: 200,
            height: 200,
            crop: 'fill',
        },
        PRODUCT: {
            width: 800,
            height: 800,
            crop: 'fill',
        },
    },
};
//# sourceMappingURL=cloudinary.constants.js.map