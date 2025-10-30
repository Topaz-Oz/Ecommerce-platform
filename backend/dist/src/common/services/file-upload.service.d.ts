import { CloudinaryService } from '../../modules/cloudinary/cloudinary.service';
export declare class FileUploadService {
    private readonly cloudinaryService;
    constructor(cloudinaryService: CloudinaryService);
    safeUploadFile(file: Express.Multer.File, publicId: string, options?: any): Promise<import("cloudinary").UploadApiResponse | import("cloudinary").UploadApiErrorResponse>;
    safeReplaceFile(file: Express.Multer.File, publicId: string, options?: any): Promise<import("cloudinary").UploadApiResponse | import("cloudinary").UploadApiErrorResponse>;
    safeDeleteFile(publicId: string): Promise<any>;
    private handleUploadError;
}
