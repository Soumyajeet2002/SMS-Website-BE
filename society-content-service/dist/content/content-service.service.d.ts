import { Repository } from 'typeorm';
import { ContentEntity } from './entities/content.entity';
import { CreateContentDto } from './dto/create-content.dto';
export declare class ContentService {
    private readonly sqlRepo;
    constructor(sqlRepo: Repository<ContentEntity>);
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
    findOne(contentId: string): Promise<{
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
}
