// src/cloudinary/cloudinary.provider.ts
import { Provider } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { CLOUDINARY } from './cloudinary.constants';
import { ConfigService } from '@nestjs/config';

export const CloudinaryProvider: Provider = {
  provide: CLOUDINARY,
  inject: [ConfigService], // 👈 1. Yêu cầu ConfigService
  useFactory: (configService: ConfigService) => {
    // 2. Chỉ khi ConfigService sẵn sàng, nó mới chạy hàm này
    return cloudinary.config({
      cloud_name: configService.get<string>('CLOUDINARY_CLOUD_NAME'),
      api_key: configService.get<string>('CLOUDINARY_API_KEY'),
      api_secret: configService.get<string>('CLOUDINARY_API_SECRET'),
    });
  },
};