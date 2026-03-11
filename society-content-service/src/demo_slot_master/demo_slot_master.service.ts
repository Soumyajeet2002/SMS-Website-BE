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
import { randomUUID } from 'crypto';

import {
  DemoSlotMasterEntity,
  SlotStatus,
} from './entities/demo-slot.entities';

import { CreateDemoSlotDto } from './dto/create-demo-slot.dto';
import { UpdateDemoSlotDto } from './dto/update-demo-slot.dto';
import { QueryDemoSlotDto } from './dto/query-demo-slot.dto';

import { demoSlotResMapperSql } from './mapper/demo-slot.response.mapper';

import { DEMO_SLOT_MASTER } from 'src/common/messages/specific.msg';
import { ConflictException } from '@nestjs/common';

@Injectable()
export class DemoSlotMasterService {
  private readonly logger = new Logger(DemoSlotMasterService.name);

  constructor(
    @InjectRepository(DemoSlotMasterEntity)
    private readonly sqlRepo: Repository<DemoSlotMasterEntity>,
  ) {}

  executeByActionType(fn: string, ...args: any[]) {
    const methodMap: Record<string, (...args: any[]) => Promise<unknown>> = {
      create: this._createSlot.bind(this),
      findAll: this._findAllSlots.bind(this),
      findOne: this._findOneSlot.bind(this),
      update: this._updateSlot.bind(this),
      remove: this._removeSlot.bind(this),
    };

    const method = methodMap[fn];

    if (!method) {
      throw new Error(`Invalid function: ${fn}`);
    }

    return method(...args);
  }

  /** Create Demo Slot */
  async _createSlot(dto: CreateDemoSlotDto, req?: any) {
    try {
      const slotId = randomUUID();
      // 🔎 Check if slot already exists
      const existingSlot = await this.sqlRepo.findOne({
        where: {
          startTime: dto.startTime,
          endTime: dto.endTime,
        },
      });

      if (existingSlot) {
        throw new ConflictException('Duplicate time slots');
      }

      const entity = this.sqlRepo.create({
        slotId,
        ...dto,
        createdBy: req?.user?.id || slotId, // optional audit
      });

      const saved = await this.sqlRepo.save(entity);

      return {
        message: DEMO_SLOT_MASTER.SUCCESS.SLOT_CREATED,
        data: demoSlotResMapperSql(saved),
      };
    } catch (error) {
      this.logger.error('Create Demo Slot Failed', error);
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException(
        DEMO_SLOT_MASTER.ERRORS.CREATE_FAILED,
      );
    }
  }

  /** Get All Demo Slots */
  async _findAllSlots(query: QueryDemoSlotDto) {
    try {
      const qb = this.sqlRepo.createQueryBuilder('slot');

      /** Ignore deleted slots */
      qb.where('slot.status != :deleted', { deleted: SlotStatus.DELETED });

      /** Search by slotName */
      if (query.search) {
        qb.andWhere('slot.slotName ILIKE :search', {
          search: `%${query.search}%`,
        });
      }

      /** Pagination */
      const page = Number(query.page) || 1;
      const limit = Number(query.limit) || 10;
      const skip = (page - 1) * limit;

      /** Safe Sorting */
      const allowedSort = ['createdAt', 'slotName', 'startTime'];
      const sortBy = allowedSort.includes(query.sortBy || '')
        ? query.sortBy
        : 'createdAt';
      const sortOrder = query.sortOrder || 'DESC';

      qb.orderBy(`slot.${sortBy}`, sortOrder as 'ASC' | 'DESC')
        .skip(skip)
        .take(limit);

      const [data, total] = await qb.getManyAndCount();

      return {
        message: DEMO_SLOT_MASTER.SUCCESS.SLOTS_FETCHED,
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        data: data.map(demoSlotResMapperSql),
      };
    } catch (error) {
      this.logger.error('Fetch Demo Slots Failed', error);
      throw new InternalServerErrorException(
        DEMO_SLOT_MASTER.ERRORS.FETCH_FAILED,
      );
    }
  }

  /** Find One Demo Slot */
  async _findOneSlot(id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException(DEMO_SLOT_MASTER.ERRORS.INVALID_SLOT_ID);
    }

    try {
      const slot = await this.sqlRepo.findOne({
        where: { slotId: id, status: SlotStatus.ACTIVE },
      });

      if (!slot) {
        throw new NotFoundException(DEMO_SLOT_MASTER.ERRORS.SLOT_NOT_FOUND);
      }

      return {
        message: DEMO_SLOT_MASTER.SUCCESS.SLOT_FETCHED,
        data: demoSlotResMapperSql(slot),
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;

      this.logger.error('Fetch Demo Slot Failed', error);
      throw new InternalServerErrorException(
        DEMO_SLOT_MASTER.ERRORS.FETCH_FAILED,
      );
    }
  }

  /** Update Demo Slot */
  async _updateSlot(id: string, dto: UpdateDemoSlotDto) {
    try {
      delete (dto as any).createdBy;
      delete (dto as any).createdAt;

      await this._findOneSlot(id);

      await this.sqlRepo.update(
        { slotId: id },
        {
          ...dto,
          updatedBy: id, // optional audit
        },
      );

      const updated = await this._findOneSlot(id);

      return {
        message: DEMO_SLOT_MASTER.SUCCESS.SLOT_UPDATED,
        data: updated.data,
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;

      this.logger.error('Update Demo Slot Failed', error);
      throw new InternalServerErrorException(
        DEMO_SLOT_MASTER.ERRORS.UPDATE_FAILED,
      );
    }
  }

  /** Soft Delete Demo Slot */
  async _removeSlot(id: string) {
    try {
      await this._findOneSlot(id);

      await this.sqlRepo.update({ slotId: id }, { status: SlotStatus.DELETED });

      return {
        message: DEMO_SLOT_MASTER.SUCCESS.SLOT_DELETED,
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;

      this.logger.error('Delete Demo Slot Failed', error);
      throw new InternalServerErrorException(
        DEMO_SLOT_MASTER.ERRORS.DELETE_FAILED,
      );
    }
  }
}
