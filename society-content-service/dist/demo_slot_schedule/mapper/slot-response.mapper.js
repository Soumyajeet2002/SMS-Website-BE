"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.demoSlotScheduleResMapperSql = void 0;
const demoSlotScheduleResMapperSql = (schedule) => ({
    scheduleId: schedule.scheduleId,
    slotDate: schedule.slotDate,
    demoBy: schedule.demoBy,
    slot: schedule.slot,
    metadata: schedule.metadata,
    createdBy: schedule.createdBy,
    createdAt: schedule.createdAt,
    updatedBy: schedule.updatedBy,
    updatedAt: schedule.updatedAt,
});
exports.demoSlotScheduleResMapperSql = demoSlotScheduleResMapperSql;
//# sourceMappingURL=slot-response.mapper.js.map