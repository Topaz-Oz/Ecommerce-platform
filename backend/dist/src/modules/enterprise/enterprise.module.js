"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnterpriseModule = void 0;
const common_1 = require("@nestjs/common");
const enterprise_controller_1 = require("./enterprise.controller");
const enterprise_service_1 = require("./enterprise.service");
const prisma_module_1 = require("../prisma/prisma.module");
const cloudinary_module_1 = require("../cloudinary/cloudinary.module");
const file_upload_service_1 = require("../../common/services/file-upload.service");
let EnterpriseModule = class EnterpriseModule {
};
exports.EnterpriseModule = EnterpriseModule;
exports.EnterpriseModule = EnterpriseModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, cloudinary_module_1.CloudinaryModule],
        controllers: [enterprise_controller_1.EnterpriseController],
        providers: [
            enterprise_service_1.EnterpriseService,
            file_upload_service_1.FileUploadService,
        ],
        exports: [enterprise_service_1.EnterpriseService],
    })
], EnterpriseModule);
//# sourceMappingURL=enterprise.module.js.map