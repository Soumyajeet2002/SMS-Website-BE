import { ContentService } from './content-service.service';
import { CreateContentDto } from './dto/create-content.dto';
import { QueryContentDto } from './dto/query-contents.dto';
import { UpdateContentDto } from './dto/update-content.dto';
export declare class ContentController {
    private contentService;
    constructor(contentService: ContentService);
    createContent(data: CreateContentDto, req: any): Promise<unknown>;
    findAll(query: QueryContentDto): Promise<unknown>;
    getContent(id: string): Promise<unknown>;
    updateContent(id: string, dto: UpdateContentDto): Promise<unknown>;
    deleteContent(id: string): Promise<unknown>;
}
