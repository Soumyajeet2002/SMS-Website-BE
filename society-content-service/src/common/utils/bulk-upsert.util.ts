import { Repository, ObjectLiteral } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export async function bulkUpsert<T extends ObjectLiteral>(
  repository: Repository<T>,
  values: QueryDeepPartialEntity<T>[],
  updateColumns: string[],
  conflictColumns: string[],
) {
  if (!values.length) return;

  await repository
    .createQueryBuilder()
    .insert()
    .values(values)
    .orUpdate(updateColumns, conflictColumns)
    .execute();
}
