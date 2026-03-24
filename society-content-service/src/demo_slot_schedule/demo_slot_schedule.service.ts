import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { In } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { isUUID } from 'class-validator';

import {
  DemoSlotScheduleEntity,
  SlotScheduleStatus,
} from './entities/slot-schedule.entities';
import { DEMO_SLOT_SCHEDULE } from '../common/messages/specific.msg';
import {
  DemoSlotMasterEntity,
  SlotStatus,
} from '../demo_slot_master/entities/demo-slot.entities';
import { ConflictException } from '@nestjs/common';
import { CreateSlotScheduleDto } from './dto/create-slot.dto';
import { GetScheduleQueryDto } from './dto/query-slot.dto';

import { CreateSlotScheduleResponseDto } from './dto/create-slot-schedule-response.dto';
import { Not } from 'typeorm';
import { UserSqlEntity } from '@sms/db-entities';
import { UpdateSlotScheduleDto } from './dto/update-slot.dto';
import { Between } from 'typeorm';

import { DemoSlotBookingEntity } from '../demo_bookings/entities/demo_booking.entities';
import { BookingStatusGuest } from '../guest_users/entities/guest-users.entities';

@Injectable()
export class DemoSlotScheduleService {
  private readonly logger = new Logger(DemoSlotScheduleService.name);

  constructor(
    @InjectRepository(DemoSlotScheduleEntity)
    private readonly sqlRepo: Repository<DemoSlotScheduleEntity>,

    @InjectRepository(DemoSlotMasterEntity)
    private readonly slotRepo: Repository<DemoSlotMasterEntity>,

    @InjectRepository(DemoSlotBookingEntity)
    private readonly bookingRepo: Repository<DemoSlotBookingEntity>,
  ) {}
  executeByActionType(fn: string, ...args: any[]) {
    const methodMap: Record<string, (...args: any[]) => Promise<unknown>> = {
      create: this._createSchedule.bind(this),
      findAll: this._findAllSchedules.bind(this),
      findOne: this._findOneSchedule.bind(this),
      update: this._updateSchedule.bind(this),
      remove: this._removeSchedule.bind(this),
      // get: this._getAvailableSlots.bind(this),
    };
    const method = methodMap[fn];

    if (!method) {
      throw new Error(`Invalid function: ${fn}`);
    }

    return method(...args);
  }

  async _createSchedule(dto: CreateSlotScheduleDto, req?: any) {
    try {
      const entities = [];

      for (const slotItem of dto.slots) {
        if (!isUUID(slotItem.slotId)) {
          throw new BadRequestException(`Invalid Slot ID: ${slotItem.slotId}`);
        }

        const slot = await this.slotRepo.findOne({
          where: { slotId: slotItem.slotId },
        });

        if (!slot) {
          throw new NotFoundException(
            `Slot Master Not Found: ${slotItem.slotId}`,
          );
        }

        const existing = await this.sqlRepo.findOne({
          where: {
            slotDate: dto.slotDate,
            slot: { slotId: slotItem.slotId },
            demoBy: dto.demoBy,
            status: Not(SlotScheduleStatus.DELETED),
          },
        });

        if (existing) {
          throw new ConflictException(
            `Slot already scheduled for this date: ${slotItem.slotId}`,
          );
        }

        const entity = this.sqlRepo.create({
          slotDate: dto.slotDate,
          slot,
          demoBy: dto.demoBy,
          status: dto.status ?? SlotScheduleStatus.ACTIVE,
          createdBy: req?.user?.id,
        });

        entities.push(entity);
      }

      const saved = await this.sqlRepo.save(entities);
      const response: CreateSlotScheduleResponseDto = {
        demoBy: dto.demoBy,
        slotDate: dto.slotDate,
        status: dto.status ?? SlotScheduleStatus.ACTIVE,
        slots: saved.map((s) => ({
          slotId: s.slot.slotId,
          slotName: s.slot.slotName,
        })),
      };

      return {
        message: 'Slot schedules created successfully',
        data: response,
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;

      this.logger.error('Create Slot Schedule Failed', error);

      throw new InternalServerErrorException('Failed to create slot schedules');
    }
  }

  // async _findAllSchedules(query: GetScheduleQueryDto) {
  //   try {
  //     const qb = this.sqlRepo
  //       .createQueryBuilder('schedule')
  //       .leftJoinAndSelect('schedule.slot', 'slot')
  //       .leftJoin(
  //         (qb) =>
  //           qb
  //             .select('u.id', 'id')
  //             .addSelect('u.name', 'name')
  //             .from('identity.users', 'u'),
  //         'usr',
  //         'usr.id = schedule.demoBy',
  //       )
  //       .addSelect('usr.name', 'demoByName');

  //     qb.where('schedule.status != :deleted', {
  //       deleted: SlotScheduleStatus.DELETED,
  //     });

  //     /** Filter by demoBy */
  //     // if (query.demoBy) {
  //     //   qb.andWhere('schedule.demoBy = :demoBy', {
  //     //     demoBy: query.demoBy,
  //     //   });
  //     // }

  //     // by name
  //     if (query.demoBy) {
  //       if (isUUID(query.demoBy)) {
  //         qb.andWhere('schedule.demoBy = :demoBy', {
  //           demoBy: query.demoBy,
  //         });
  //       } else {
  //         qb.andWhere('usr.name ILIKE :demoBy', {
  //           demoBy: `%${query.demoBy}%`,
  //         });
  //       }
  //     }

  //     /** Filter by date */
  //     if (query.date) {
  //       qb.andWhere('schedule.slotDate = :date', {
  //         date: query.date,
  //       });
  //     }

  //     /** Search by slotName */
  //     if (query.search) {
  //       qb.andWhere('slot.slotName ILIKE :search', {
  //         search: `%${query.search}%`,
  //       });
  //     }

  //     /** Safe Sorting */
  //     const allowedSort = ['createdAt', 'slotDate'];
  //     const sortBy = allowedSort.includes(query.sortBy || '')
  //       ? query.sortBy
  //       : 'createdAt';

  //     const sortOrder = query.sortOrder || 'DESC';

  //     qb.orderBy(`schedule.${sortBy}`, sortOrder as 'ASC' | 'DESC');

  //     // ✅ Status filter (NEW)
  //     if (query.status) {
  //       qb.andWhere('schedule.status = :status', {
  //         status: query.status,
  //       });
  //     }

  //     /** Fetch rows */
  //     const { entities, raw } = await qb.getRawAndEntities();

  //     const rows = entities.map((entity, index) => ({
  //       ...entity,
  //       demoByName: raw[index]?.demoByName,
  //     }));

  //     /** GROUP SLOTS BY slotDate + demoBy */
  //     const grouped: Record<string, any> = {};

  //     for (const row of rows) {
  //       const key = `${row.slotDate}-${row.demoBy}`;

  //       if (!grouped[key]) {
  //         grouped[key] = {
  //           scheduleId: row.scheduleId,
  //           slotDate: row.slotDate,
  //           demoBy: row.demoByName ?? row.demoBy, // show name
  //           slots: [],
  //         };
  //       }

  //       grouped[key].slots.push({
  //         slotId: row.slot?.slotId,
  //         slotName: row.slot?.slotName,
  //         // status: row.slot?.status,
  //         status: row.status,
  //       });
  //     }

  //     /** Convert grouped object to array */
  //     let data = Object.values(grouped);

  //     /** Total merged schedules */
  //     const total = data.length;

  //     /** Pagination AFTER merging */
  //     const page = Number(query.page) || 1;
  //     const limit = query.limit ? Number(query.limit) : null;

  //     if (limit) {
  //       const start = (page - 1) * limit;
  //       const end = start + limit;
  //       data = data.slice(start, end);
  //     }

  //     return {
  //       message: DEMO_SLOT_SCHEDULE.SUCCESS.SCHEDULES_FETCHED,
  //       page,
  //       limit,
  //       total,
  //       totalPages: limit ? Math.ceil(total / limit) : 1,
  //       data,
  //     };
  //   } catch (error) {
  //     this.logger.error('Fetch Slot Schedules Failed', error);

  //     throw new InternalServerErrorException(
  //       DEMO_SLOT_SCHEDULE.ERRORS.FETCH_FAILED,
  //     );
  //   }
  // }

  async _findAllSchedules(query: GetScheduleQueryDto) {
    try {
      const qb = this.sqlRepo
        .createQueryBuilder('schedule')
        .leftJoinAndSelect('schedule.slot', 'slot')
        .leftJoin(
          (qb) =>
            qb
              .select('u.id', 'id')
              .addSelect('u.name', 'name')
              .from('identity.users', 'u'),
          'usr',
          'usr.id = schedule.demoBy',
        )
        .addSelect('usr.name', 'demoByName');

      qb.where('schedule.status != :deleted', {
        deleted: SlotScheduleStatus.DELETED,
      });

      // by name
      if (query.demoBy) {
        if (isUUID(query.demoBy)) {
          qb.andWhere('schedule.demoBy = :demoBy', {
            demoBy: query.demoBy,
          });
        } else {
          qb.andWhere('usr.name ILIKE :demoBy', {
            demoBy: `%${query.demoBy}%`,
          });
        }
      }

      /** Filter by date */
      if (query.date) {
        qb.andWhere('schedule.slotDate = :date', {
          date: query.date,
        });
      }

      /** Search by slotName */
      if (query.search) {
        qb.andWhere('slot.slotName ILIKE :search', {
          search: `%${query.search}%`,
        });
      }

      /** Safe Sorting */
      const allowedSort = ['createdAt', 'slotDate'];
      const sortBy = allowedSort.includes(query.sortBy || '')
        ? query.sortBy
        : 'createdAt';

      const sortOrder = query.sortOrder || 'DESC';

      qb.orderBy(`schedule.${sortBy}`, sortOrder as 'ASC' | 'DESC');

      // ✅ Status filter (existing)
      if (query.status) {
        qb.andWhere('schedule.status = :status', {
          status: query.status,
        });
      }

      /** Fetch rows */
      const { entities, raw } = await qb.getRawAndEntities();

      const rows = entities.map((entity, index) => ({
        ...entity,
        demoByName: raw[index]?.demoByName,
      }));

      // ============================================================
      // ✅ NEW: Fetch bookings where status = BOOKED (1)
      // This will help us mark slot as inactive (0)
      // ============================================================
      const scheduleIds = rows.map((r) => r.scheduleId);

      const bookedSchedules = await this.bookingRepo.find({
        where: {
          scheduleId: In(scheduleIds),
          bookingStatus: BookingStatusGuest.BOOKED, // only booked
        },
        select: ['scheduleId'],
      });

      // Create quick lookup set
      const datagrouped = rows.map((row) => ({
        schedule_id: row.scheduleId,

        demoBy: row.demoByName ?? row.demoBy,
        slot_date: row.slotDate,

        slot_id: row.slot?.slotId,
        slot_name: row.slot?.slotName,
        start_time: row.slot?.startTime,
        end_time: row.slot?.endTime,
        SlotStatus: row.slot?.status,

        schedule_status: row.status,
      }));

      /** Convert grouped object to array */
      let data = Object.values(datagrouped);

      /** Total merged schedules */
      const total = data.length;

      /** Pagination AFTER merging */
      const page = Number(query.page) || 1;
      const limit = query.limit ? Number(query.limit) : null;

      if (limit) {
        const start = (page - 1) * limit;
        const end = start + limit;
        data = data.slice(start, end);
      }

      return {
        message: DEMO_SLOT_SCHEDULE.SUCCESS.SCHEDULES_FETCHED,
        page,
        limit,
        total,
        totalPages: limit ? Math.ceil(total / limit) : 1,
        data,
      };
    } catch (error) {
      this.logger.error('Fetch Slot Schedules Failed', error);

      throw new InternalServerErrorException(
        DEMO_SLOT_SCHEDULE.ERRORS.FETCH_FAILED,
      );
    }
  }

  async _findOneSchedule(demoBy: string) {
    try {
      const qb = this.sqlRepo
        .createQueryBuilder('schedule')
        .leftJoinAndSelect('schedule.slot', 'slot')
        .leftJoin(
          (qb) =>
            qb
              .select('u.id', 'id')
              .addSelect('u.name', 'name')
              .from('identity.users', 'u'),
          'usr',
          'usr.id = schedule.demoBy',
        )
        .addSelect('usr.name', 'demoByName')
        .where('schedule.demoBy = :demoBy', { demoBy })
        .andWhere('schedule.status = :status', {
          status: SlotScheduleStatus.ACTIVE,
        })
        .orderBy('schedule.slotDate', 'ASC');

      const { entities, raw } = await qb.getRawAndEntities();

      if (!entities.length) {
        throw new NotFoundException('Slot Schedule Not Found');
      }

      const rows = entities.map((entity, index) => ({
        ...entity,
        demoByName: raw[index]?.demoByName,
      }));

      const grouped = rows.reduce(
        (acc, item) => {
          const date = item.slotDate;

          if (!acc[date]) {
            acc[date] = {
              date,
              demoBy: item.demoByName ?? item.demoBy,
              slots: [],
            };
          }

          acc[date].slots.push({
            slotId: item.slot.slotId,
            slotName: item.slot.slotName,
            startTime: item.slot.startTime,
            endTime: item.slot.endTime,
          });

          return acc;
        },
        {} as Record<string, any>,
      );

      return {
        message: 'Slot schedules fetched',
        data: Object.values(grouped),
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;

      this.logger.error('Fetch Slot Schedule Failed', error);

      throw new InternalServerErrorException('Failed to fetch slot schedule');
    }
  }

  /** Update Slot Schedule */
  async _updateSchedule(id: string, dto: UpdateSlotScheduleDto) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid Schedule ID');
    }

    const queryRunner = this.sqlRepo.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Fetch existing schedules for this scheduleId
      const existingSchedules = await queryRunner.manager.find(
        this.sqlRepo.target,
        {
          where: { scheduleId: id },
          relations: ['slot'],
        },
      );

      if (!existingSchedules.length) {
        throw new NotFoundException('Slot Schedule Not Found');
      }

      const schedule = existingSchedules[0];

      // Update demoBy and slotDate if provided
      schedule.demoBy = dto.demoBy ?? schedule.demoBy;
      schedule.slotDate = dto.slotDate ?? schedule.slotDate;
      await queryRunner.manager.save(schedule);

      // Handle slots if provided
      if (dto.slots) {
        const incomingSlotIds = dto.slots.map((s) => s.slotId);

        // Soft-inactive
        for (const slotRow of existingSchedules) {
          if (!incomingSlotIds.includes(slotRow.slot.slotId)) {
            slotRow.status = SlotScheduleStatus.INACTIVE;
            slotRow.updatedAt = new Date();
            await queryRunner.manager.save(slotRow);
          }
        }

        // Add or update slots
        for (const slotItem of dto.slots) {
          const slot = await this.slotRepo.findOne({
            where: { slotId: slotItem.slotId },
          });
          if (!slot)
            throw new NotFoundException(
              `Slot Master Not Found: ${slotItem.slotId}`,
            );

          // Check if this slot already exists for the same date
          const existingSlotSchedule = await queryRunner.manager.findOne(
            this.sqlRepo.target,
            {
              where: {
                slotDate: schedule.slotDate,
                slot: { slotId: slotItem.slotId },
              },
              relations: ['slot'],
            },
          );

          if (existingSlotSchedule) {
            // Update status if already exists
            existingSlotSchedule.status =
              slotItem.status ?? existingSlotSchedule.status;
            existingSlotSchedule.updatedAt = new Date();
            await queryRunner.manager.save(existingSlotSchedule);
          } else {
            // Create new schedule row
            const newSchedule = this.sqlRepo.create({
              slotDate: schedule.slotDate,
              demoBy: schedule.demoBy,
              slot,
              status: slotItem.status ?? SlotScheduleStatus.ACTIVE,
            });
            await queryRunner.manager.save(newSchedule);
          }
        }
      }

      await queryRunner.commitTransaction();

      // Return updated schedules
      const updated = await this.sqlRepo.find({
        where: { slotDate: schedule.slotDate, demoBy: schedule.demoBy },
        relations: ['slot'],
      });

      return {
        message: 'Slot schedule updated',
        data: updated,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();

      if (error instanceof HttpException) throw error;

      this.logger.error('Update Slot Schedule Failed', error);
      throw new InternalServerErrorException('Failed to update slot schedule');
    } finally {
      await queryRunner.release();
    }
  }
  /** Soft Delete Slot Schedule */
  async _removeSchedule(id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid Schedule ID');
    }

    try {
      const result = await this.sqlRepo.update(
        { scheduleId: id, status: SlotScheduleStatus.ACTIVE },
        {
          status: SlotScheduleStatus.DELETED, // 2
          updatedBy: id,
        },
      );

      if (!result.affected) {
        throw new NotFoundException('Slot Schedule Not Found');
      }

      return {
        message: 'Slot schedule deleted',
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;

      this.logger.error('Delete Slot Schedule Failed', error);

      throw new InternalServerErrorException('Failed to delete slot schedule');
    }
  }

  async getBookedSlots(demoBy: string, date: string) {
    try {
      if (!demoBy || !date) {
        throw new BadRequestException('demoBy and date are required');
      }

      const qb = this.sqlRepo
        .createQueryBuilder('schedule')
        .leftJoinAndSelect('schedule.slot', 'slot')
        .leftJoin(
          (qb) =>
            qb
              .select('u.id', 'id')
              .addSelect('u.name', 'name')
              .from('identity.users', 'u'),
          'usr',
          'usr.id = schedule.demoBy',
        );

      /** ✅ SAME LOGIC AS _findAllSchedules */
      if (isUUID(demoBy)) {
        qb.where('schedule.demoBy = :demoBy', { demoBy });
      } else {
        qb.where('usr.name ILIKE :demoBy', {
          demoBy: `%${demoBy}%`,
        });
      }

      /** ✅ Date filter */
      qb.andWhere('schedule.slotDate = :date', { date });

      /** ✅ Only active bookings */
      qb.andWhere('schedule.status IN (:...statuses)', {
        statuses: [SlotScheduleStatus.ACTIVE, SlotScheduleStatus.INACTIVE],
      });

      const bookedSlots = await qb.getMany();

      return {
        message: 'Booked slots fetched',
        data: bookedSlots.map((s) => ({
          slotId: s.slot.slotId,
          slotName: s.slot.slotName,
          startTime: s.slot.startTime,
          endTime: s.slot.endTime,
          status: s.status,
        })),
      };
    } catch (error) {
      this.logger.error('Fetch Booked Slots Failed', error);

      if (error instanceof HttpException) throw error;

      throw new InternalServerErrorException('Failed to fetch booked slots');
    }
  }
}
