import { Controller, Get, Post, Put, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { EnterpriseService } from './enterprise.service';
import { CreateEnterpriseDto, UpdateEnterpriseDto } from './dto/enterprise.dto';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@modules/auth/guards/roles.guard';
import { Roles } from '@modules/auth/decorators/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('enterprise')
@Controller('enterprise')
export class EnterpriseController {
  constructor(private readonly enterpriseService: EnterpriseService) {}

  @ApiOperation({ summary: 'Create a new enterprise account' })
  @ApiResponse({ status: 201, description: 'Enterprise account has been created.' })
  @Post()
  create(@Body() createEnterpriseDto: CreateEnterpriseDto) {
    return this.enterpriseService.create(createEnterpriseDto);
  }

  @ApiOperation({ summary: 'Update enterprise profile' })
  @ApiResponse({ status: 200, description: 'Enterprise profile has been updated.' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ENTERPRISE, Role.ADMIN)
  @ApiBearerAuth()
  @Put(':userId')
  update(
    @Param('userId') userId: string,
    @Body() updateEnterpriseDto: UpdateEnterpriseDto,
  ) {
    return this.enterpriseService.update(userId, updateEnterpriseDto);
  }

  @ApiOperation({ summary: 'Get enterprise by ID' })
  @ApiResponse({ status: 200, description: 'Return enterprise details.' })
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.enterpriseService.findById(id);
  }

  @ApiOperation({ summary: 'Get enterprise by user ID' })
  @ApiResponse({ status: 200, description: 'Return enterprise details.' })
  @Get('user/:userId')
  findByUserId(@Param('userId') userId: string) {
    return this.enterpriseService.findByUserId(userId);
  }

  @ApiOperation({ summary: 'Get all enterprises' })
  @ApiResponse({ status: 200, description: 'Return all enterprises.' })
  @Get()
  findAll() {
    return this.enterpriseService.findAll();
  }
}