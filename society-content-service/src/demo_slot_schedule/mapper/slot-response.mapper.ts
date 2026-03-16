import { DemoSlotScheduleEntity } from '../entities/slot-schedule.entities';

export const demoSlotScheduleResMapperSql = (
  schedule: DemoSlotScheduleEntity,
) => ({
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
