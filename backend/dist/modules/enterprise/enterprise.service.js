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
exports.EnterpriseService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let EnterpriseService = class EnterpriseService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        return this.prisma.user.create({
            data: {
                email: data.email,
                password: data.password,
                name: data.name,
                phone: data.phone,
                avatar: data.avatar,
                role: client_1.Role.ENTERPRISE,
                enterprise: {
                    create: {
                        companyName: data.companyName,
                        taxCode: data.taxCode,
                    },
                },
            },
            include: {
                enterprise: true,
            },
        });
    }
    async update(userId, data) {
        return this.prisma.user.update({
            where: { id: userId },
            data: {
                name: data.name,
                phone: data.phone,
                avatar: data.avatar,
                enterprise: {
                    update: {
                        companyName: data.companyName,
                        taxCode: data.taxCode,
                    },
                },
            },
            include: {
                enterprise: true,
            },
        });
    }
    async findById(id) {
        return this.prisma.enterprise.findUnique({
            where: { id },
            include: {
                user: true,
                products: true,
            },
        });
    }
    async findByUserId(userId) {
        return this.prisma.enterprise.findUnique({
            where: { userId },
            include: {
                user: true,
                products: true,
            },
        });
    }
    async findAll() {
        return this.prisma.enterprise.findMany({
            include: {
                user: true,
                products: true,
            },
        });
    }
};
exports.EnterpriseService = EnterpriseService;
exports.EnterpriseService = EnterpriseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EnterpriseService);
//# sourceMappingURL=enterprise.service.js.map