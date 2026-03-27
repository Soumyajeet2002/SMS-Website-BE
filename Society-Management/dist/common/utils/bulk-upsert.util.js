"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bulkUpsert = bulkUpsert;
async function bulkUpsert(repository, values, updateColumns, conflictColumns) {
    if (!values.length)
        return { inserted: 0, updated: 0 };
    const result = await repository
        .createQueryBuilder()
        .insert()
        .values(values)
        .orUpdate(updateColumns, conflictColumns)
        .returning('xmax')
        .execute();
    const rows = result.raw || [];
    const inserted = rows.filter((r) => r.xmax === '0').length;
    const updated = rows.length - inserted;
    return { inserted, updated };
}
//# sourceMappingURL=bulk-upsert.util.js.map