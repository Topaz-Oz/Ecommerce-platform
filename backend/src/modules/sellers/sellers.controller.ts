import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { SellersService } from './sellers.service';
import { CreateSellerDto, UpdateSellerDto } from './dto/sellers.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Role } from '@prisma/client';

@ApiTags('sellers')
@Controller('sellers')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class SellersController {
  constructor(private readonly sellersService: SellersService) {}

  @ApiOperation({ summary: 'Create a seller profile' })
  @ApiResponse({ status: 201, description: 'Seller profile has been created.' })
  @Post()
  create(@Request() req, @Body() createSellerDto: CreateSellerDto) {
    return this.sellersService.create(req.user.id, createSellerDto);
  }

  @ApiOperation({ summary: 'Get all sellers' })
  @ApiResponse({ status: 200, description: 'Return all sellers.' })
  @Get()
  findAll() {
    return this.sellersService.findAll();
  }

  @ApiOperation({ summary: 'Get seller by ID' })
  @ApiResponse({ status: 200, description: 'Return the seller.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sellersService.findOne(id);
  }

  @ApiOperation({ summary: 'Update seller profile' })
  @ApiResponse({ status: 200, description: 'Seller profile has been updated.' })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSellerDto: UpdateSellerDto,
    @Request() req,
  ) {
    // Check if the user is the seller or an admin
    const seller = this.sellersService.findOne(id);
    if (req.user.role !== Role.ADMIN && seller['userId'] !== req.user.id) {
      throw new Error('Unauthorized');
    }
    return this.sellersService.update(id, updateSellerDto);
  }

  @ApiOperation({ summary: 'Verify seller (Admin only)' })
  @ApiResponse({ status: 200, description: 'Seller verification status updated.' })
  @Patch(':id/verify')
  verifyStatus(
    @Param('id') id: string,
    @Body('verified') verified: boolean,
    @Request() req,
  ) {
    if (req.user.role !== Role.ADMIN) {
      throw new Error('Unauthorized - Admin only');
    }
    return this.sellersService.updateVerificationStatus(id, verified);
  }

  @ApiOperation({ summary: 'Delete seller profile' })
  @ApiResponse({ status: 200, description: 'Seller profile has been deleted.' })
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    // Check if the user is the seller or an admin
    const seller = this.sellersService.findOne(id);
    if (req.user.role !== Role.ADMIN && seller['userId'] !== req.user.id) {
      throw new Error('Unauthorized');
    }
    return this.sellersService.delete(id);
  }
}