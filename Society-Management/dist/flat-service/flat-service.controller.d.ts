import { FlatServiceService } from './flat-service.service';
import { CreateSocietyFlatListingDto } from './dto/create-society-flat-listing.dto';
import { UpdateSocietyFlatListingDto } from './dto/update-society-flat-listing.dto';
import { QueryFlatDto } from './dto/query-flat.dto';
export declare class FlatServiceController {
    private flatService;
    constructor(flatService: FlatServiceService);
    createFlat(req: Request, data: CreateSocietyFlatListingDto): Promise<any>;
    getFlatList(query: QueryFlatDto): Promise<any>;
    updateFlat(data: UpdateSocietyFlatListingDto, req: any): Promise<any>;
}
