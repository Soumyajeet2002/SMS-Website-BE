import { Repository } from 'typeorm';
import { ContentEntity } from './entities/content.entity';
import { CreateContentDto } from './dto/create-content.dto';
import { Request } from 'express';
import { QueryContentDto } from './dto/query-contents.dto';
import { UpdateContentDto } from './dto/update-content.dto';
export declare class ContentService {
    private readonly sqlRepo?;
    private readonly logger;
    constructor(sqlRepo?: Repository<ContentEntity> | undefined);
    executeByActionType(fn: string, ...args: any[]): Promise<unknown>;
    _createContentSql(dto: CreateContentDto, req: Request): Promise<{
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
    _findAllSql(query: QueryContentDto): Promise<{
        message: string;
        page: number;
        limit: number;
        total: number;
        totalPages: number;
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
    _findOneSql(contentId: string): Promise<{
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
    _removeContentSql(contentId: string): Promise<{
        message: string;
    }>;
    _updateContentSql(id: string, dto: UpdateContentDto, req: Request): Promise<{
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
