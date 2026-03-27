export declare class CreateMediaDto {
    fileName: string;
    filePath: string;
    fileSize?: number;
    mimeType?: string;
    fileExtension?: string;
    isPrimary?: boolean;
    displayOrder?: number;
    status: number;
    metadata?: Record<string, any>;
}
