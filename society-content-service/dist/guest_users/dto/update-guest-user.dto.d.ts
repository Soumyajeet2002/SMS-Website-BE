import { CreateGuestUserDto } from './create-guest-user.dto';
declare const UpdateGuestUserDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateGuestUserDto>>;
export declare class UpdateGuestUserDto extends UpdateGuestUserDto_base {
    updatedBy?: string;
}
export {};
