"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.demoSlotResMapperSql = void 0;
const demoSlotResMapperSql = (data) => ({
    slot_Id: data.slotId,
    slot_Name: data.slotName,
    start_Time: data.startTime,
    end_Time: data.endTime,
    duration_Minutes: data.durationMinutes,
    status: data.status,
    metadata: data.metadata,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
});
exports.demoSlotResMapperSql = demoSlotResMapperSql;
//# sourceMappingURL=demo-slot.response.mapper.js.map