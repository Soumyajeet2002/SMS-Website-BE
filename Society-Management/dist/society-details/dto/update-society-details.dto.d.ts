import { CreateSocietySetupDetailsDto } from './create-society-details.dto';
declare const UpdateSocietyDetailsDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateSocietySetupDetailsDto>>;
export declare class UpdateSocietyDetailsDto extends UpdateSocietyDetailsDto_base {
    updatedBy?: string;
}
export {};
