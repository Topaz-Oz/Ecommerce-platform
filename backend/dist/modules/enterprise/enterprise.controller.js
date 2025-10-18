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
};
exports.EnterpriseController = EnterpriseController;
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Create a new enterprise account' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Enterprise account has been created.' }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [enterprise_dto_1.CreateEnterpriseDto]),
    __metadata("design:returntype", void 0)
], EnterpriseController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: 'Update enterprise profile' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Enterprise profile has been updated.' }),
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
exports.EnterpriseController = EnterpriseController = __decorate([
    (0, swagger_1.ApiTags)('enterprise'),
    (0, common_1.Controller)('enterprise'),
    __metadata("design:paramtypes", [enterprise_service_1.EnterpriseService])
], EnterpriseController);
//# sourceMappingURL=enterprise.controller.js.map