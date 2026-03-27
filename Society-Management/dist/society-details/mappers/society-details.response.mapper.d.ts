import { SocietySetupDetailsEntity } from "../entities/society-details.entity";
export declare const societyDetailsResponseMapper: (data: SocietySetupDetailsEntity & {
    admins?: any[];
}) => {
    societyId: string;
    societyName: string;
    societyCode: string;
    registrationNumber: string;
    societyType: string;
    societyLevel: string | undefined;
    establishmentYear: number | undefined;
    totalArea: number | undefined;
    blocks: {
        blockName: string;
        numberOfFloors: number;
        totalFlats: number;
        parkingSlots: number;
        blockCode: string;
        blockId: string;
    }[];
    adminDetails: {
        userId: any;
        roleName: any;
        roleId: any;
        name: any;
        email: any;
        mobile: any;
    }[];
    addressLine1: string;
    areaLocality: string;
    city: string;
    districtCode: string;
    stateCode: string;
    pincode: string;
    landmark: string | undefined;
    packageId: string;
    status: number;
    onboardingDate: Date;
    isDeleted: boolean;
    createdBy: string;
    createdAt: Date;
    updatedBy: string | undefined;
    updatedAt: Date | undefined;
} | null;
