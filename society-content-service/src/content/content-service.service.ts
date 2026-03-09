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

import { ContentEntity } from './entities/content.entity';
import { CreateContentDto } from './dto/create-content.dto';
import { contentResponseMapper } from './mappers/content.response.mapper';
import { Request } from 'express';
import { QueryContentDto } from './dto/query-contents.dto';
import { CONTENT } from 'src/common/messages/specific.msg';
import { UpdateContentDto } from './dto/update-content.dto';

@Injectable()
export class ContentService {
  private readonly logger = new Logger(ContentService.name);

  constructor(
    @InjectRepository(ContentEntity)
    private readonly sqlRepo?: Repository<ContentEntity>,
  ) {}

  executeByActionType(fn: string, ...args: any[]) {
    const methodMap: Record<string, (...args: any[]) => Promise<unknown>> = {
      create: this._createContentSql.bind(this),
      findAll: this._findAllSql.bind(this),
      findOne: this._findOneSql.bind(this),
      update: this._updateContentSql.bind(this),
      remove: this._removeContentSql.bind(this),
    };

    const method = methodMap[fn];
    if (!method) throw new Error(`Invalid function: ${fn}`);

    return method(...args);
  }

  /** Create Content */
  // async _createContentSql(dto: CreateContentDto, req: any) {
  async _createContentSql(dto: CreateContentDto, req: Request) {
    try {
      const entity = this.sqlRepo!.create({
        ...dto,
        currentVersionNo: 1,
        workingVersionNo: 1,
        // createdBy: req?.user?.userId,

        createdBy: (req as any)?.id ?? (req as any)?.userId,
      });

      const saved = await this.sqlRepo!.save(entity);

      return {
        message: CONTENT.SUCCESS.CONTENT_CREATED,
        data: contentResponseMapper(saved),
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error({
          error: error.message,
          stack: error.stack,
          payload: dto,
        });
      }

      throw new InternalServerErrorException(CONTENT.ERRORS.CREATE_FAILED);
    }
  }

  /** Get All Contents */
  async _findAllSql(query: QueryContentDto) {
    try {
      const qb = this.sqlRepo!.createQueryBuilder('content');

      /** Search */
      if (query.search) {
        qb.andWhere(
          '(content.slug ILIKE :search OR content.contentType ILIKE :search)',
          { search: `%${query.search}%` },
        );
      }

      /** Filter */
      if (query.contentType) {
        qb.andWhere('content.contentType = :contentType', {
          contentType: query.contentType,
        });
      }

      /** Pagination */
      const page = Number(query.page) || 1;
      const limit = Number(query.limit) || 10;
      const skip = (page - 1) * limit;

      /** Sorting */
      const sortBy = query.sortBy || 'createdAt';
      const sortOrder = query.sortOrder || 'DESC';

      qb.orderBy(`content.${sortBy}`, sortOrder as 'ASC' | 'DESC')
        .skip(skip)
        .take(limit);

      const [data, total] = await qb.getManyAndCount();

      return {
        message: CONTENT.SUCCESS.CONTENT_FETCHED,
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        data: data.map(contentResponseMapper),
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error({
          error: error.message,
          stack: error.stack,
        });
      }

      throw new InternalServerErrorException(CONTENT.ERRORS.FETCH_FAILED);
    }
  }

  /** Find One Content */
  async _findOneSql(contentId: string) {
    if (!isUUID(contentId)) {
      throw new BadRequestException(CONTENT.ERRORS.INVALID_CONTENT_ID);
    }

    try {
      const entity = await this.sqlRepo!.findOne({
        where: { contentId },
      });

      if (!entity) {
        throw new NotFoundException(CONTENT.ERRORS.CONTENT_NOT_FOUND);
      }

      return {
        message: CONTENT.SUCCESS.CONTENT_FETCHED,
        data: contentResponseMapper(entity),
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error({
          error: error.message,
          stack: error.stack,
        });
      }

      throw new InternalServerErrorException(CONTENT.ERRORS.FETCH_ONE_FAILED);
    }
  }

  /** Remove Content */
  async _removeContentSql(contentId: string) {
    try {
      await this._findOneSql(contentId);

      await this.sqlRepo!.update({ contentId }, { status: 2 });

      return {
        message: CONTENT.SUCCESS.CONTENT_DELETED,
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error({
          error: error.message,
          stack: error.stack,
          payload: contentId,
        });
      }

      throw new InternalServerErrorException(CONTENT.ERRORS.DELETE_FAILED);
    }
  }

  // Patch method -> Update content

  async _updateContentSql(id: string, dto: UpdateContentDto, req: Request) {
    try {
      // Should not update these values
      delete (dto as any).createdBy;
      delete (dto as any).createdAt;

      const isPresent = await this._findOneSql(id);

      if (!isPresent) {
        throw new NotFoundException(CONTENT.ERRORS.CONTENT_NOT_FOUND);
      }

      await this.sqlRepo!.update(id, {
        ...dto,
        updatedBy: (req as any)?.id ?? (req as any)?.userId,
        // updatedBy: (req as any)?.id ?? (req as any)?.userId,
      });

      const updatedData = await this._findOneSql(id);

      return {
        message: CONTENT.SUCCESS.CONTENT_UPDATED,
        data: updatedData.data,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      if (error instanceof Error) {
        this.logger.error({
          error: error.message,
          stack: error.stack,
          payload: { id, dto },
        });
      }

      throw new InternalServerErrorException(CONTENT.ERRORS.UPDATE_FAILED);
    }
  }

  // DELETE method -> delete
}
