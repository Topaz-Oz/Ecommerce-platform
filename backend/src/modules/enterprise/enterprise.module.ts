import { Module } from '@nestjs/common';
import { EnterpriseController } from './enterprise.controller';
import { EnterpriseService } from './enterprise.service';
import { PrismaModule } from '../prisma/prisma.module';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { FileUploadService } from '../../common/services/file-upload.service';

@Module({
  imports: [PrismaModule, CloudinaryModule],
  controllers: [EnterpriseController],
  providers: [
    EnterpriseService,
    FileUploadService,
  ],
  exports: [EnterpriseService],
})
export class EnterpriseModule {}