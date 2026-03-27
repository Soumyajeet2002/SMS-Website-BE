import { SocietySetupDetailsEntity } from './society-details.entity';
export declare class SocietyBlockEntity {
    blockId: string;
    societyId: string;
    society: SocietySetupDetailsEntity;
    blockName: string;
    blockCode: string;
    totalFloors: number;
    totalFlats: number;
    parkingSlot: number;
    blockType?: string;
    status: number;
    createdBy: string;
    createdAt: Date;
    updatedBy?: string;
    updatedAt?: Date;
    isDeleted: boolean;
}
