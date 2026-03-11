import { DemoSlotMasterEntity } from '../entities/demo-slot.entities';

export const demoSlotResMapperSql = (data: DemoSlotMasterEntity) => ({
  slot_Id: data.slotId,
  slot_Name: data.slotName,
  start_Time: data.startTime,
  end_Time: data.endTime,
  duration_Minutes: data.durationMinutes,
  status: data.status,
  metadata: data.metadata,
  // createdBy: data.createdBy,
  createdAt: data.createdAt,
  // updatedBy: data.updatedBy,
  updatedAt: data.updatedAt,
});
