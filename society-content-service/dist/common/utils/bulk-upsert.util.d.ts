import { Repository, ObjectLiteral } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
export declare function bulkUpsert<T extends ObjectLiteral>(repository: Repository<T>, values: QueryDeepPartialEntity<T>[], updateColumns: string[], conflictColumns: string[]): Promise<void>;
