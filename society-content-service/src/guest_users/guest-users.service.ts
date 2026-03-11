import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { isUUID } from 'class-validator';
import { randomUUID } from 'crypto';

import { GuestUserEntity } from './entities/guest-users.entities';

import { CreateGuestUserDto } from './dto/create-guest-user.dto';
import { UpdateGuestUserDto } from './dto/update-guest-user.dto';
import { QueryGuestUserDto } from './dto/query-guest-user.dto';

import { guestUserResMapperSql } from './mapper/guest-users.response.mapper';

import { GUEST_USERS } from 'src/common/messages/specific.msg';

@Injectable()
export class GuestUsersService {
  private readonly logger = new Logger(GuestUsersService.name);

  constructor(
    @InjectRepository(GuestUserEntity)
    private readonly sqlRepo: Repository<GuestUserEntity>,
  ) {}

  executeByActionType(fn: string, ...args: any[]) {
    const methodMap: Record<string, (...args: any[]) => Promise<unknown>> = {
      create: this._createGuestUserSql.bind(this),
      findAll: this._findAllSql.bind(this),
      findOne: this._findOneSql.bind(this),
      update: this._updateSql.bind(this),
      remove: this._removeSql.bind(this),
    };

    const method = methodMap[fn];

    if (!method) {
      throw new Error(`Invalid function: ${fn}`);
    }

    return method(...args);
  }

  /** Create Guest User */
  async _createGuestUserSql(dto: CreateGuestUserDto) {
    try {
      const guestId = randomUUID();

      //
      const existingSlot = await this.sqlRepo.findOne({
        where: {
          mobileNo: dto.mobileNo,
        },
      });

      if (existingSlot) {
        throw new ConflictException('Duplicate mobile number');
      }

      const entity = this.sqlRepo.create({
        guestId: guestId,
        ...dto,
        createdBy: guestId,
      });
      // const entity = this.sqlRepo.create({
      //   ...dto,
      //   createdBy: '550e8400-e29b-41d4-a716-446655440000',
      // });

      const saved = await this.sqlRepo.save(entity);

      return {
        message: GUEST_USERS.SUCCESS.GUEST_USER_CREATED,
        data: guestUserResMapperSql(saved),
      };
    } catch (error) {
      this.logger.error('Create Guest User Failed', error);
      if (error instanceof ConflictException) {
        throw error;
      }

      throw new InternalServerErrorException(GUEST_USERS.ERRORS.CREATE_FAILED);
    }
  }

  /** Get All Guest Users */
  async _findAllSql(query: QueryGuestUserDto) {
    try {
      const qb = this.sqlRepo.createQueryBuilder('guestUser');

      /** Ignore deleted users */
      qb.where('guestUser.status != :deleted', { deleted: 2 });

      /** Search */
      if (query.search) {
        qb.andWhere(
          `(guestUser.fullName ILIKE :search 
          OR guestUser.email ILIKE :search 
          OR guestUser.mobileNo ILIKE :search)`,
          { search: `%${query.search}%` },
        );
      }

      /** Pagination */
      const page = Number(query.page) || 1;
      const limit = Number(query.limit) || 10;
      const skip = (page - 1) * limit;

      /** Safe Sorting */
      const allowedSort = ['createdAt', 'fullName', 'email'];
      const sortBy = allowedSort.includes(query.sortBy || '')
        ? query.sortBy
        : 'createdAt';

      const sortOrder = query.sortOrder || 'DESC';

      qb.orderBy(`guestUser.${sortBy}`, sortOrder as 'ASC' | 'DESC')
        .skip(skip)
        .take(limit);

      const [data, total] = await qb.getManyAndCount();

      return {
        message: GUEST_USERS.SUCCESS.GUEST_USER_FETCHED,
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        data: data.map(guestUserResMapperSql),
      };
    } catch (error) {
      this.logger.error('Fetch Guest Users Failed', error);

      throw new InternalServerErrorException(GUEST_USERS.ERRORS.FETCH_FAILED);
    }
  }

  /** Find One Guest User */
  async _findOneSql(id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException(GUEST_USERS.ERRORS.INVALID_GUEST_USER_ID);
    }

    try {
      const guestUser = await this.sqlRepo.findOne({
        where: { guestId: id, status: 1 },
      });

      if (!guestUser) {
        throw new NotFoundException(GUEST_USERS.ERRORS.GUEST_USER_NOT_FOUND);
      }

      return {
        message: GUEST_USERS.SUCCESS.GUEST_USER_FETCHED,
        data: guestUserResMapperSql(guestUser),
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      this.logger.error('Fetch Guest User Failed', error);

      throw new InternalServerErrorException(GUEST_USERS.ERRORS.FETCH_FAILED);
    }
  }

  /** Update Guest User */
  async _updateSql(id: string, dto: UpdateGuestUserDto) {
    try {
      delete (dto as any).createdBy;
      delete (dto as any).createdAt;

      await this._findOneSql(id);

      await this.sqlRepo.update(
        { guestId: id },
        {
          ...dto,
          // updatedBy: 'e7b1c2d4-8a9f-4d8a-bb10-123456789abc',
          updatedBy: id,
        },
      );

      const updated = await this._findOneSql(id);

      return {
        message: GUEST_USERS.SUCCESS.GUEST_USER_UPDATED,
        data: updated.data,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      this.logger.error('Update Guest User Failed', error);

      throw new InternalServerErrorException(GUEST_USERS.ERRORS.UPDATE_FAILED);
    }
  }

  /** Soft Delete Guest User */
  // async _removeSql(id: string) {
  //   try {
  //     await this._findOneSql(id);

  //     await this.sqlRepo.update({ guestId: id }, { status: 2 });

  //     return {
  //       message: GUEST_USERS.SUCCESS.GUEST_USER_DELETED,
  //     };
  //   } catch (error) {
  //     if (error instanceof HttpException) {
  //       throw error;
  //     }

  //     this.logger.error('Delete Guest User Failed', error);

  //     throw new InternalServerErrorException(GUEST_USERS.ERRORS.DELETE_FAILED);
  //   }
  // }

  // hard delete
  async _removeSql(id: string) {
    try {
      // Ensure the record exists
      await this._findOneSql(id);

      // Hard delete the record
      await this.sqlRepo.delete({ guestId: id });

      return {
        message: GUEST_USERS.SUCCESS.GUEST_USER_DELETED,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      this.logger.error('Delete Guest User Failed', error);

      throw new InternalServerErrorException(GUEST_USERS.ERRORS.DELETE_FAILED);
    }
  }
}
