import { Module } from '@nestjs/common';
import { SellersService } from './sellers.service';
import { SellersController } from './sellers.controller';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { PrismaModule } from '../prisma/prisma.module';
import { FileUploadService } from '../../common/services';
//import { FileUploadInterceptor } from '../../common/interceptors/file-upload.interceptor';

@Module({
  imports: [PrismaModule, CloudinaryModule],
  controllers: [SellersController],
  providers: [SellersService, FileUploadService,],
  exports: [SellersService],
})
export class SellersModule {}