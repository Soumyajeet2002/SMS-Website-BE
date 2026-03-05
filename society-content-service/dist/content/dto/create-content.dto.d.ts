import { ContentStatus } from '../entities/content.entity';
export declare class CreateContentDto {
    societyId: string;
    slug: string;
    title: string;
    contentType: string;
    priority?: number;
    isFeatured?: boolean;
    publishAt?: Date;
    expireAt?: Date;
    metadata?: Record<string, any>;
    status?: ContentStatus;
}
