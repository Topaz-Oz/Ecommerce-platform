import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
  ApiConsumes,
} from '@nestjs/swagger';
import { EnterpriseService } from './enterprise.service';
import { CreateEnterpriseDto, UpdateEnterpriseDto } from './dto/enterprise.dto';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@modules/auth/guards/roles.guard';
import { Roles } from '@modules/auth/decorators/roles.decorator';
import { Role } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadInterceptor } from '../../common/interceptors';

@ApiTags('enterprise')
@Controller('enterprise')
export class EnterpriseController {
  constructor(private readonly enterpriseService: EnterpriseService) {}

  @ApiOperation({ summary: 'Create a new enterprise account' })
  @ApiResponse({
    status: 201,
    description: 'Enterprise account has been created.',
  })
  @Post()
  create(@Body() createEnterpriseDto: CreateEnterpriseDto) {
    return this.enterpriseService.create(createEnterpriseDto);
  }

  @ApiOperation({ summary: 'Update enterprise profile' })
  @ApiResponse({
    status: 200,
    description: 'Enterprise profile has been updated.',
  })
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

  // File Upload Endpoints
  @Post(':id/logo')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ENTERPRISE)
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file'),
    new FileUploadInterceptor({ required: true }), // 👈 SỬA Ở ĐÂY
  )
  uploadLogo(
    @Param('id') id: string,
    @UploadedFile(new ParseFilePipe())
    file: Express.Multer.File,
  ) {
    return this.enterpriseService.uploadLogo(file, id);
  }

  @Put(':id/logo')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ENTERPRISE)
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file'),
    new FileUploadInterceptor({ required: true }), // 👈 SỬA Ở ĐÂY
  )
  updateLogo(
    @Param('id') id: string,
    @UploadedFile(new ParseFilePipe())
    file: Express.Multer.File,
  ) {
    return this.enterpriseService.updateLogo(file, id);
  }

  @Delete(':id/logo')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ENTERPRISE)
  @ApiBearerAuth()
  deleteLogo(@Param('id') id: string) {
    return this.enterpriseService.deleteLogo(id);
  }

  @Post(':id/documents/:type')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ENTERPRISE)
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file'),
    new FileUploadInterceptor({ required: true }), // 👈 SỬA Ở ĐÂY
  )
  uploadDocument(
    @Param('id') id: string,
    @Param('type') type: 'business' | 'brand' | 'tax',
    @UploadedFile(new ParseFilePipe())
    file: Express.Multer.File,
  ) {
    return this.enterpriseService.uploadDocument(file, id, type);
  }

  @Delete(':id/documents/:type')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ENTERPRISE)
  @ApiBearerAuth()
  deleteDocument(
    @Param('id') id: string,
    @Param('type') type: 'business' | 'brand' | 'tax',
  ) {
    return this.enterpriseService.deleteDocument(id, type);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ENTERPRISE, Role.ADMIN)
  @ApiBearerAuth()
  delete(@Param('id') id: string) {
    return this.enterpriseService.delete(id);
  }
}