import { ContentService } from './content-service.service';
import { CreateContentDto } from './dto/create-content.dto';
export declare class ContentController {
    private readonly contentService;
    constructor(contentService: ContentService);
    create(dto: CreateContentDto, req: any): Promise<{
        message: string;
        data: {
            contentId: string;
            societyId: string;
            slug: string;
            title: string;
            contentType: string;
            currentVersionNo: number;
            workingVersionNo: number;
            publishAt: Date | undefined;
            expireAt: Date | undefined;
            priority: number;
            isFeatured: boolean;
            status: import("./entities/content.entity").ContentStatus;
        };
    }>;
    findAll(): Promise<{
        message: string;
        total: number;
        data: {
            contentId: string;
            societyId: string;
            slug: string;
            title: string;
            contentType: string;
            currentVersionNo: number;
            workingVersionNo: number;
            publishAt: Date | undefined;
            expireAt: Date | undefined;
            priority: number;
            isFeatured: boolean;
            status: import("./entities/content.entity").ContentStatus;
        }[];
    }>;
    findOne(id: string): Promise<{
        message: string;
        data: {
            contentId: string;
            societyId: string;
            slug: string;
            title: string;
            contentType: string;
            currentVersionNo: number;
            workingVersionNo: number;
            publishAt: Date | undefined;
            expireAt: Date | undefined;
            priority: number;
            isFeatured: boolean;
            status: import("./entities/content.entity").ContentStatus;
        };
    }>;
}
