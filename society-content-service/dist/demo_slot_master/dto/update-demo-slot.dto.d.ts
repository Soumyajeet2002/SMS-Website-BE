import { CreateDemoSlotDto } from './create-demo-slot.dto';
declare const UpdateDemoSlotDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateDemoSlotDto>>;
export declare class UpdateDemoSlotDto extends UpdateDemoSlotDto_base {
    updatedBy?: string;
}
export {};
