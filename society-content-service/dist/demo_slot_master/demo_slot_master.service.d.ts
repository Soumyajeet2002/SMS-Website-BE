import { Repository } from 'typeorm';
import { DemoSlotMasterEntity, SlotStatus } from './entities/demo-slot.entities';
import { CreateDemoSlotDto } from './dto/create-demo-slot.dto';
import { UpdateDemoSlotDto } from './dto/update-demo-slot.dto';
import { QueryDemoSlotDto } from './dto/query-demo-slot.dto';
export declare class DemoSlotMasterService {
    private readonly sqlRepo;
    private readonly logger;
    constructor(sqlRepo: Repository<DemoSlotMasterEntity>);
    executeByActionType(fn: string, ...args: any[]): Promise<unknown>;
    _createSlot(dto: CreateDemoSlotDto, req?: any): Promise<{
        message: string;
        data: {
            slot_Id: string;
            slot_Name: string;
            start_Time: string;
            end_Time: string;
            duration_Minutes: number;
            status: SlotStatus;
            metadata: Record<string, any> | undefined;
            createdAt: Date;
            updatedAt: Date | undefined;
        };
    }>;
    _findAllSlots(query: QueryDemoSlotDto): Promise<{
        message: string;
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        data: {
            slot_Id: string;
            slot_Name: string;
            start_Time: string;
            end_Time: string;
            duration_Minutes: number;
            status: SlotStatus;
            metadata: Record<string, any> | undefined;
            createdAt: Date;
            updatedAt: Date | undefined;
        }[];
    }>;
    _findOneSlot(id: string): Promise<{
        message: string;
        data: {
            slot_Id: string;
            slot_Name: string;
            start_Time: string;
            end_Time: string;
            duration_Minutes: number;
            status: SlotStatus;
            metadata: Record<string, any> | undefined;
            createdAt: Date;
            updatedAt: Date | undefined;
        };
    }>;
    _updateSlot(id: string, dto: UpdateDemoSlotDto): Promise<{
        message: string;
        data: {
            slot_Id: string;
            slot_Name: string;
            start_Time: string;
            end_Time: string;
            duration_Minutes: number;
            status: SlotStatus;
            metadata: Record<string, any> | undefined;
            createdAt: Date;
            updatedAt: Date | undefined;
        };
    }>;
    _removeSlot(id: string): Promise<{
        message: string;
    }>;
}
