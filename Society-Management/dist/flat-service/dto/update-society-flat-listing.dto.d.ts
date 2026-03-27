import { UpdateMediaDto } from "src/media/dto/update-media.dto";
import { BaseFlatListingDto } from "./base-flat-listing.dto";
declare const UpdateSocietyFlatListingDto_base: import("@nestjs/common").Type<Partial<BaseFlatListingDto>>;
export declare class UpdateSocietyFlatListingDto extends UpdateSocietyFlatListingDto_base {
    id: string;
    media?: UpdateMediaDto[];
}
export {};
