import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { isUUID } from 'class-validator';

import {
  DemoSlotScheduleEntity,
  SlotScheduleStatus,
} from './entities/slot-schedule.entities';
import { DEMO_SLOT_SCHEDULE } from '../common/messages/specific.msg';
import { DemoSlotMasterEntity } from '../demo_slot_master/entities/demo-slot.entities';
import { ConflictException } from '@nestjs/common';
import { CreateSlotScheduleDto } from './dto/create-slot.dto';
import { GetScheduleQueryDto } from './dto/query-slot.dto';

import { CreateSlotScheduleResponseDto } from './dto/create-slot-schedule-response.dto';
import { Not } from 'typeorm';
import { UpdateSlotScheduleDto } from './dto/update-slot.dto';

import { DemoSlotBookingEntity } from '../demo_bookings/entities/demo_booking.entities';

import { DeleteScheduleDto } from './dto/delete.dto';

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

      const scheduleIds = rows.map((r) => r.scheduleId);

      const groupedMap = new Map();

      rows.forEach((row) => {
        const key = `${row.slotDate}_${row.demoByName ?? row.demoBy}`;

        if (!groupedMap.has(key)) {
          groupedMap.set(key, {
            slotDate: row.slotDate,
            demoBy: row.demoByName ?? row.demoBy,
            demoById: row.demoBy,
            slots: [],
          });
        }

        groupedMap.get(key).slots.push({
          scheduleId: row.scheduleId,
          slotId: row.slot?.slotId,
          slotName: row.slot?.slotName,
          status: row.status,
        });
      });

      let data = Array.from(groupedMap.values());

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

  async _updateSchedule(dto: UpdateSlotScheduleDto) {
    const queryRunner = this.sqlRepo.manager.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      if (!dto.slots || !dto.slots.length) {
        throw new BadRequestException('Slots are required');
      }

      const results = [];

      for (const slotItem of dto.slots) {
        const { scheduleId, slotId, status } = slotItem;

        // 🔍 Validate slot master
        const slot = await this.slotRepo.findOne({
          where: { slotId },
        });

        if (!slot) {
          throw new NotFoundException(`Slot Master Not Found: ${slotId}`);
        }

        if (scheduleId) {
          if (!isUUID(scheduleId)) {
            throw new BadRequestException(`Invalid Schedule ID: ${scheduleId}`);
          }

          const existing = await queryRunner.manager.findOne(
            this.sqlRepo.target,
            {
              where: { scheduleId },
              relations: ['slot'],
            },
          );

          if (!existing) {
            throw new NotFoundException(
              `Slot Schedule Not Found: ${scheduleId}`,
            );
          }

          existing.demoBy = dto.demoBy ?? existing.demoBy;
          existing.slotDate = dto.slotDate ?? existing.slotDate;
          existing.status = status ?? existing.status;
          existing.slot = slot;
          existing.updatedAt = new Date();

          const saved = await queryRunner.manager.save(existing);
          results.push(saved);
        } else {
          const newSchedule = this.sqlRepo.create({
            // scheduleId: uuid(),
            slot,
            demoBy: dto.demoBy,
            slotDate: dto.slotDate,
            status: status ?? SlotScheduleStatus.ACTIVE,
          });

          const saved = await queryRunner.manager.save(newSchedule);
          results.push(saved);
        }
      }

      await queryRunner.commitTransaction();

      return {
        message: 'Schedules processed successfully',
        data: results,
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

  async _removeSchedule(dto: DeleteScheduleDto) {
    try {
      const result = await this.sqlRepo.update(
        {
          slotDate: dto.slotDate,
          demoBy: dto.demoBy,
        },
        {
          status: SlotScheduleStatus.DELETED, // 2
          updatedBy: dto.demoBy,
          updatedAt: new Date(),
        },
      );

      if (!result.affected) {
        throw new NotFoundException('No Slot Schedules Found');
      }

      return {
        message: 'All slot schedules deleted successfully',
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;

      this.logger.error('Delete Slot Schedule Failed', error);

      throw new InternalServerErrorException('Failed to delete slot schedules');
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
