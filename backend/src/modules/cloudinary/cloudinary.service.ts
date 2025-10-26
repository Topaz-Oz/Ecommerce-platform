// src/cloudinary/cloudinary.service.ts
import { Injectable } from '@nestjs/common';
import {
  UploadApiErrorResponse,
  UploadApiResponse,
  v2 as cloudinary,
} from 'cloudinary';
import * as streamifier from 'streamifier';

@Injectable()
export class CloudinaryService {
  /**
   * 1. HÀM CHO API (Upload từ Buffer)
   */
  async uploadFile(
    file: Express.Multer.File,
    folder: string,
    options: any = {}, // 👈 Đã sửa
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: folder,
          ...options, // 👈 Đã gộp options
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );
      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }

  /**
   * 2. HÀM CHO SCRIPT (Upload từ Path hoặc URL)
   */
  async uploadFromPath(
    path: string, // Có thể là local path hoặc URL
    folder: string,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    try {
      return await cloudinary.uploader.upload(path, {
        folder: folder,
      });
    } catch (error) {
      console.error('Lỗi upload từ path:', error);
      throw error;
    }
  }

  /**
   * 3. HÀM XÓA FILE (Dùng public_id)
   */
  async deleteFile(publicId: string): Promise<any> {
    return cloudinary.uploader.destroy(publicId);
  }

  /**
   * 4. HÀM HELPER (BỊ THIẾU)
   * Trích xuất public_id để xóa file
   */
  getPublicIdFromUrl(imageUrl: string): string | null {
    try {
      const regex = /upload\/(?:v\d+\/)?(.*?)\.[^.]+$/;
      const match = imageUrl.match(regex);
      return match ? match[1] : null;
    } catch (error) {
      console.error('Error parsing public_id from URL:', error);
      return null;
    }
  }
}