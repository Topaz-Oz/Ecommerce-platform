import { Module } from '@nestjs/common';
import { EnterpriseController } from './enterprise.controller';
import { EnterpriseService } from './enterprise.service';
//import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [EnterpriseController],
  providers: [EnterpriseService],
  exports: [EnterpriseService],
  //imports: [PrismaModule],
})
export class EnterpriseModule {}