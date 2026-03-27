import { Repository, ObjectLiteral } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

// export async function bulkUpsert<T extends ObjectLiteral>(
//   repository: Repository<T>,
//   values: QueryDeepPartialEntity<T>[],
//   updateColumns: string[],
//   conflictColumns: string[],
// ) {
//   if (!values.length) return;

//   await repository
//     .createQueryBuilder()
//     .insert()
//     .values(values)
//     .orUpdate(updateColumns, conflictColumns)
//     .execute();
// }

export async function bulkUpsert<T extends ObjectLiteral>(
  repository: Repository<T>,
  values: QueryDeepPartialEntity<T>[],
  updateColumns: string[],
  conflictColumns: string[],
) {
  if (!values.length) return { inserted: 0, updated: 0 };

  const result = await repository
    .createQueryBuilder()
    .insert()
    .values(values)
    .orUpdate(updateColumns, conflictColumns)
    .returning('xmax') //if xmax = 0 -> inserted xmax != 0 -> updated
    .execute();

  const rows = result.raw || [];

  const inserted = rows.filter((r: any) => r.xmax === '0').length;
  const updated = rows.length - inserted;

  return { inserted, updated };
}
