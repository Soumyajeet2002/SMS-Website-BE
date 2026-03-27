import { SocietyBlockEntity } from './society-block.entity';
export declare class SocietySetupDetailsEntity {
    societyId: string;
    societyName: string;
    societyCode: string;
    registrationNumber: string;
    societyType: string;
    societyLevelId?: string;
    societyLevelCode?: string;
    establishmentYear?: number;
    totalArea?: number;
    infrastructureDetails: {
        numberOfBlocks?: number;
        blocks?: any[];
    };
    blocks: SocietyBlockEntity[];
    addressLine1: string;
    areaLocality: string;
    city: string;
    districtCode: string;
    stateCode: string;
    pincode: string;
    landmark?: string;
    adminName?: string;
    adminMobile?: string;
    adminEmail?: string;
    packageId: string;
    status: number;
    onboardingDate: Date;
    createdBy: string;
    createdAt: Date;
    updatedBy?: string;
    updatedAt?: Date;
    isDeleted: boolean;
}
