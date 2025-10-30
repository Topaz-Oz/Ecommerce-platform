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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnterpriseController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const enterprise_service_1 = require("./enterprise.service");
const enterprise_dto_1 = require("./dto/enterprise.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_guard_1 = require("../auth/guards/roles.guard");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const client_1 = require("@prisma/client");
const platform_express_1 = require("@nestjs/platform-express");
const interceptors_1 = require("../../common/interceptors");
let EnterpriseController = class EnterpriseController {
    constructor(enterpriseService) {
        this.enterpriseService = enterpriseService;
    }
    create(createEnterpriseDto) {
        return this.enterpriseService.create(createEnterpriseDto);
    }
    update(userId, updateEnterpriseDto) {
        return this.enterpriseService.update(userId, updateEnterpriseDto);
    }
    findById(id) {
        return this.enterpriseService.findById(id);
    }
    findByUserId(userId) {
        return this.enterpriseService.findByUserId(userId);
    }
    findAll() {
        return this.enterpriseService.findAll();
    }
    uploadLogo(id, file) {
        return this.enterpriseService.uploadLogo(file, id);
    }
    updateLogo(id, file) {
        return this.enterpriseService.updateLogo(file, id);
    }
    deleteLogo(id) {
        return this.enterpriseService.deleteLogo(id);
    }
    uploadDocument(id, type, file) {
        return this.enterpriseService.uploadDocument(file, id, type);
    }
    deleteDocument(id, type) {
        return this.enterpriseService.deleteDocument(id, type);
    }
    delete(id) {
        return this.enterpriseService.delete(id);
    }
};
exports.EnterpriseController = EnterpriseController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a new enterprise account' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'Enterprise account has been created.',
    }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [enterprise_dto_1.CreateEnterpriseDto]),
    __metadata("design:returntype", void 0)
], EnterpriseController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update enterprise profile' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Enterprise profile has been updated.',
    }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.ENTERPRISE, client_1.Role.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Put)(':userId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, enterprise_dto_1.UpdateEnterpriseDto]),
    __metadata("design:returntype", void 0)
], EnterpriseController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get enterprise by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return enterprise details.' }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EnterpriseController.prototype, "findById", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get enterprise by user ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return enterprise details.' }),
    (0, common_1.Get)('user/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EnterpriseController.prototype, "findByUserId", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Get all enterprises' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Return all enterprises.' }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EnterpriseController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(':id/logo'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.ENTERPRISE),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file'), new interceptors_1.FileUploadInterceptor({ required: true })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFile)(new common_1.ParseFilePipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], EnterpriseController.prototype, "uploadLogo", null);
__decorate([
    (0, common_1.Put)(':id/logo'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.ENTERPRISE),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file'), new interceptors_1.FileUploadInterceptor({ required: true })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFile)(new common_1.ParseFilePipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], EnterpriseController.prototype, "updateLogo", null);
__decorate([
    (0, common_1.Delete)(':id/logo'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.ENTERPRISE),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EnterpriseController.prototype, "deleteLogo", null);
__decorate([
    (0, common_1.Post)(':id/documents/:type'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.ENTERPRISE),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file'), new interceptors_1.FileUploadInterceptor({ required: true })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('type')),
    __param(2, (0, common_1.UploadedFile)(new common_1.ParseFilePipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], EnterpriseController.prototype, "uploadDocument", null);
__decorate([
    (0, common_1.Delete)(':id/documents/:type'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.ENTERPRISE),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], EnterpriseController.prototype, "deleteDocument", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(client_1.Role.ENTERPRISE, client_1.Role.ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EnterpriseController.prototype, "delete", null);
exports.EnterpriseController = EnterpriseController = __decorate([
    (0, swagger_1.ApiTags)('enterprise'),
    (0, common_1.Controller)('enterprise'),
    __metadata("design:paramtypes", [enterprise_service_1.EnterpriseService])
], EnterpriseController);
//# sourceMappingURL=enterprise.controller.js.map