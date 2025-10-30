export declare class EmailService {
    private transporter;
    constructor();
    sendVerificationEmail(email: string, token: string): Promise<void>;
    sendRoleApprovalEmail(email: string, role: string): Promise<void>;
}
