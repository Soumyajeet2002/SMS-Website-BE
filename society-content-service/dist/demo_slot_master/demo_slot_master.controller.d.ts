import { DemoSlotMasterService } from './demo_slot_master.service';
import { CreateDemoSlotDto } from './dto/create-demo-slot.dto';
import { UpdateDemoSlotDto } from './dto/update-demo-slot.dto';
import { QueryDemoSlotDto } from './dto/query-demo-slot.dto';
export declare class DemoSlotMasterController {
    private demoSlotMasterService;
    constructor(demoSlotMasterService: DemoSlotMasterService);
    createPublic(data: CreateDemoSlotDto, req: any): Promise<unknown>;
    findAll(query: QueryDemoSlotDto): Promise<unknown>;
    findOne(id: string): Promise<unknown>;
    update(id: string, updateDto: UpdateDemoSlotDto): Promise<unknown>;
    remove(id: string): Promise<unknown>;
}
