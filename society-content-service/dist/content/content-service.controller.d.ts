import { ContentService } from './content-service.service';
import { CreateContentDto } from './dto/create-content.dto';
export declare class ContentController {
    private readonly contentService;
    constructor(contentService: ContentService);
    createContent(data: CreateContentDto, req: any): Promise<unknown>;
    findAll(): Promise<unknown>;
    getContent(id: string): Promise<unknown>;
}
