import { ContentEntity } from '../entities/content.entity';
export declare const contentResponseMapper: (data: ContentEntity) => {
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
    status: import("../entities/content.entity").ContentStatus;
};
