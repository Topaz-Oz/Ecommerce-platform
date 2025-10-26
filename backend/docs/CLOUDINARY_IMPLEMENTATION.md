# Cloudinary Integration Guide

## Modules Using Cloudinary

### 1. Users Module
- Feature: Avatar Upload
- Folder: `avatars/`
- Max Size: 5MB
- Allowed Types: jpg, jpeg, png, gif

### 2. Products Module
- Feature: Product Images
- Folder: `products/`
- Max Images: 8 per product
- Max Size: 5MB per image
- Allowed Types: jpg, jpeg, png, gif

### 3. Sellers Module
- Feature: Store Banner/Logo
- Folder: `store-banners/`
- Max Size: 5MB
- Allowed Types: jpg, jpeg, png

### 4. Enterprise Module
- Feature: Company Logo
- Folder: `enterprise-logos/`
- Max Size: 5MB
- Allowed Types: jpg, jpeg, png

### 5. Logistics Module
- Feature: Shipper Avatar
- Folder: `shipper-avatars/`
- Max Size: 5MB
- Allowed Types: jpg, jpeg, png

## API Endpoints

### Users
```
PATCH /users/:id/avatar
```

### Products
```
POST /products/:id/images
DELETE /products/:id/images
```

### Sellers
```
PATCH /sellers/:id/banner
PATCH /sellers/:id/logo
```

### Enterprise
```
PATCH /enterprise/:id/logo
```

### Logistics
```
PATCH /logistics/shippers/:id/avatar
```

## Configuration

### Environment Variables
```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Folder Structure
```
src/
├── modules/
│   ├── cloudinary/
│   │   ├── cloudinary.module.ts
│   │   ├── cloudinary.service.ts
│   │   ├── cloudinary.provider.ts
│   │   └── cloudinary.constants.ts
│   ├── users/
│   ├── products/
│   ├── sellers/
│   ├── enterprise/
│   └── logistics/
└── common/
    └── pipes/
        └── file-validation.pipe.ts
```

## Usage Examples

### Upload Single File
```typescript
// In your service
async uploadFile(file: Express.Multer.File) {
  return this.cloudinaryService.uploadFile(file, CLOUDINARY_FOLDERS.AVATARS);
}
```

### Upload Multiple Files
```typescript
// In your service
async uploadMultipleFiles(files: Express.Multer.File[]) {
  const uploadPromises = files.map(file => 
    this.cloudinaryService.uploadFile(file, CLOUDINARY_FOLDERS.PRODUCTS)
  );
  return Promise.all(uploadPromises);
}
```

### Delete File
```typescript
// In your service
async deleteFile(imageUrl: string) {
  const publicId = this.cloudinaryService.getPublicIdFromUrl(imageUrl);
  if (publicId) {
    await this.cloudinaryService.deleteFile(publicId);
  }
}
```

## Best Practices

1. **Always Use Constants**
```typescript
import { CLOUDINARY_FOLDERS } from '../cloudinary/cloudinary.constants';
```

2. **Validate Files**
```typescript
@UseInterceptors(FileInterceptor('file'))
@Post('upload')
uploadFile(
  @UploadedFile(new FileValidationPipe()) file: Express.Multer.File
) {
  return this.service.uploadFile(file);
}
```

3. **Handle Old Files**
```typescript
// Delete old file before uploading new one
if (user.avatar) {
  const publicId = this.cloudinaryService.getPublicIdFromUrl(user.avatar);
  await this.cloudinaryService.deleteFile(publicId);
}
```

4. **Use Transactions**
```typescript
await this.prisma.$transaction(async (tx) => {
  const uploadResult = await this.cloudinaryService.uploadFile(file);
  await tx.user.update({
    where: { id },
    data: { avatar: uploadResult.url }
  });
});
```

5. **Error Handling**
```typescript
try {
  await this.cloudinaryService.uploadFile(file);
} catch (error) {
  throw new BadRequestException('Failed to upload file');
}
```

## Testing

### Mock CloudinaryService
```typescript
const mockCloudinaryService = {
  uploadFile: jest.fn(),
  deleteFile: jest.fn(),
  getPublicIdFromUrl: jest.fn()
};

describe('YourService', () => {
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        YourService,
        {
          provide: CloudinaryService,
          useValue: mockCloudinaryService
        }
      ],
    }).compile();
  });
});
```

### Test File Upload
```typescript
it('should upload file', async () => {
  mockCloudinaryService.uploadFile.mockResolvedValue({
    url: 'https://res.cloudinary.com/demo/image/upload/v1/test.jpg'
  });
  
  const result = await service.uploadFile(mockFile);
  expect(result.url).toBeDefined();
});
```