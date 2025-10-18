export declare class CreateEnterpriseDto {
    email: string;
    password: string;
    name: string;
    phone?: string;
    avatar?: string;
    companyName: string;
    taxCode?: string;
}
export declare class UpdateEnterpriseDto {
    name?: string;
    phone?: string;
    avatar?: string;
    companyName?: string;
    taxCode?: string;
    verified?: boolean;
    officialBrand?: boolean;
}
