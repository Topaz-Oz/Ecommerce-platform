// src/cloudinary/cloudinary.module.ts
import { Module } from '@nestjs/common';
import { CloudinaryProvider } from './cloudinary.provider';
import { CloudinaryService } from './cloudinary.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule], // 👈 1. Cần ConfigModule
  providers: [CloudinaryProvider, CloudinaryService], // 👈 2. Cung cấp provider và service
  exports: [CloudinaryService], // 👈 3. Xuất service ra ngoài
})
export class CloudinaryModule {}