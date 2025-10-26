import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CloudinaryService } from '../../modules/cloudinary/cloudinary.service';

@Injectable()
export class FileUploadService {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  /**
   * Safely uploads a file to Cloudinary with error handling
   */
  async safeUploadFile(
    file: Express.Multer.File,
    publicId: string,
    options: any = {}
  ) {
    try {
      return await this.cloudinaryService.uploadFile(file, publicId, options);
    } catch (error) {
      this.handleUploadError(error);
    }
  }

  /**
   * Safely replaces a file in Cloudinary with error handling
   */
  async safeReplaceFile(
    file: Express.Multer.File,
    publicId: string,
    options: any = {}
  ) {
    try {
      // Delete the old file first
      await this.safeDeleteFile(publicId);
      
      // Upload the new file
      return await this.cloudinaryService.uploadFile(file, publicId, options);
    } catch (error) {
      this.handleUploadError(error);
    }
  }

  /**
   * Safely deletes a file from Cloudinary with error handling
   */
  async safeDeleteFile(publicId: string) {
    try {
      return await this.cloudinaryService.deleteFile(publicId);
    } catch (error) {
      if (error.http_code !== 404) {
        // Only throw if it's not a "not found" error
        this.handleUploadError(error);
      }
    }
  }

  /**
   * Common error handler for file operations
   */
  private handleUploadError(error: any) {
    console.error('File operation error:', error);
    throw new InternalServerErrorException(
      'An error occurred during the file operation'
    );
  }
}