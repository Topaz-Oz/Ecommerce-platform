import { AuthService } from './auth.service';
import { RegisterDto, ChangePasswordDto } from './dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(req: any): Promise<{
        access_token: string;
        user: any;
    }>;
    register(data: RegisterDto): Promise<{
        id: string;
        email: string;
        name: string;
        phone: string | null;
        avatar: string | null;
        createdAt: Date;
        updatedAt: Date;
        role: import(".prisma/client").$Enums.Role;
        isVerified: boolean;
        isActive: boolean;
    }>;
    verifyEmail(token: string): Promise<{
        message: string;
    }>;
    resendVerification(email: string): Promise<{
        message: string;
    }>;
    refresh(req: any): Promise<{
        access_token: string;
    }>;
    changePassword(req: any, data: ChangePasswordDto): Promise<{
        message: string;
    }>;
    getCurrentUser(req: any): Promise<{
        id: string;
        email: string;
        name: string;
        role: import(".prisma/client").$Enums.Role;
        isVerified: boolean;
    }>;
}
