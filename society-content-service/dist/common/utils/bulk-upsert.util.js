"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bulkUpsert = bulkUpsert;
async function bulkUpsert(repository, values, updateColumns, conflictColumns) {
    if (!values.length)
        return;
    await repository
        .createQueryBuilder()
        .insert()
        .values(values)
        .orUpdate(updateColumns, conflictColumns)
        .execute();
}
//# sourceMappingURL=bulk-upsert.util.js.map