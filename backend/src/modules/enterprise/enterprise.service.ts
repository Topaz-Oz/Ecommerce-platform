import { Injectable } from '@nestjs/common';
import { PrismaService } from '@modules/prisma/prisma.service';
import { Role } from '@prisma/client';

@Injectable()
export class EnterpriseService {
  constructor(private prisma: PrismaService) {}

  async create(data: {
    email: string;
    password: string;
    name: string;
    phone?: string;
    avatar?: string;
    companyName: string;
    taxCode?: string;
  }) {
    return this.prisma.user.create({
      data: {
        email: data.email,
        password: data.password,
        name: data.name,
        phone: data.phone,
        avatar: data.avatar,
        role: Role.ENTERPRISE,
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

  async update(userId: string, data: {
    name?: string;
    phone?: string;
    avatar?: string;
    companyName?: string;
    taxCode?: string;
  }) {
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

  async findById(id: string) {
    return this.prisma.enterprise.findUnique({
      where: { id },
      include: {
        user: true,
        products: true,
      },
    });
  }

  async findByUserId(userId: string) {
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
}