export declare enum ContentStatus {
    INACTIVE = 0,
    ACTIVE = 1,
    DELETED = 2
}
export declare class ContentEntity {
    contentId: string;
    societyId: string;
    slug: string;
    title: string;
    contentType: string;
    currentVersionNo: number;
    workingVersionNo: number;
    publishAt?: Date;
    expireAt?: Date;
    priority: number;
    isFeatured: boolean;
    status: ContentStatus;
    createdBy?: string;
    createdAt: Date;
    updatedBy?: string;
    updatedAt?: Date;
}
