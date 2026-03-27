import { CreateMediaDto } from 'src/media/dto/create-media.dto';
import { BaseFlatListingDto } from './base-flat-listing.dto';
export declare class CreateSocietyFlatListingDto extends BaseFlatListingDto {
    media?: CreateMediaDto[];
}
