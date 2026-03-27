import { BlockDto } from './block.dto';
import { AdminSocietyMapDto } from './admin-society-map.dto';
export declare class CreateSocietySetupDetailsDto {
    societyName: string;
    societyCode: string;
    registrationNumber: string;
    societyType: string;
    societyLevelId?: string;
    societyLevelCode?: string;
    establishmentYear?: number;
    totalArea?: number;
    numberOfBlocks: number;
    blocks: BlockDto[];
    addressLine1: string;
    areaLocality: string;
    city: string;
    districtCode: string;
    stateCode: string;
    pincode: string;
    landmark?: string;
    adminDetails: AdminSocietyMapDto[];
    packageId: string;
    status?: number;
}
