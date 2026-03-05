// import {
//   BadRequestException,
//   Injectable,
//   InternalServerErrorException,
//   NotFoundException,
// } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';

// import { ContentEntity } from './entities/content.entity';
// import { CreateContentDto } from './dto/create-content.dto';
// import { contentResponseMapper } from './mappers/content.response.mapper';
// // import { QueryContentDto } from './dto/query-contents.dto';

// @Injectable()
// export class ContentService {
//   constructor(
//     @InjectRepository(ContentEntity)
//     private readonly sqlRepo: Repository<ContentEntity>,
//   ) {}
//   // executableByActionType(fn: string, ...args: any[]) {
//   //   const methodMap: Record<string, Function> = {
//   //     create: this._createContentservice.bind(this),
//   //     findAll: this._findAllsql.bind(this),
//   //     findONe: this._findonesql.bind(this),
//   //     remove: this._removedatasql.bind(this),
//   //   };
//   //   const method = methodMap(fn);
//   //   if (!method) throw new Error(`Invalid function: ${fn}`);
//   //   return method(...args);
//   // }
//   /* ============================================================
//      CREATE
//   ============================================================ */
//   async create(dto: CreateContentDto, req: any) {
//     try {
//       console.log('Creating content with DTO:');
//       const entity = this.sqlRepo.create({
//         ...dto,
//         currentVersionNo: 1,
//         workingVersionNo: 1,
//         createdBy: req?.user?.userId,
//       });

//       const saved = await this.sqlRepo.save(entity);

//       return {
//         message: 'Content created successfully',
//         data: contentResponseMapper(saved),
//       };
//     } catch (error) {
//       // Postgres duplicate key error
//       if (error?.code === '23505') {
//         throw new BadRequestException('Duplicate slug');
//       }

//       throw new InternalServerErrorException('Content creation failed');
//     }
//   }

//   /* ============================================================
//      GET BY ID
//   ============================================================ */
//   async findOne(contentId: string) {
//     const entity = await this.sqlRepo.findOne({
//       where: { contentId },
//     });

//     if (!entity) {
//       throw new NotFoundException('Content not found');
//     }

//     return {
//       message: 'Content fetched successfully',
//       data: contentResponseMapper(entity),
//     };
//   }

//   /* ============================================================
//      GET ALL
//   ============================================================ */

//   // async findAll(query: QueryContentDto) {
//   //   const qb = this.sqlRepo.createQueryBuilder('c');

//   //   // Optional search
//   //   if (query.search) {
//   //     qb.andWhere('c.title ILIKE :search', {
//   //       search: `%${query.search}%`,
//   //     });
//   //   }

//   //   // Pagination
//   //   const page = Number(query.page) || 1;
//   //   const limit = Number(query.limit) || 10;
//   //   const skip = (page - 1) * limit;

//   //   // Sorting
//   //   const sortBy = query.sortBy || 'createdAt';
//   //   const sortOrder = query.sortOrder?.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

//   //   qb.orderBy(`c.${sortBy}`, sortOrder).skip(skip).take(limit);

//   //   const [data, total] = await qb.getManyAndCount();

//   //   return {
//   //     page,
//   //     limit,
//   //     total,
//   //     totalPages: Math.ceil(total / limit),
//   //     message: 'Contents fetched successfully',
//   //     data: data.map(contentResponseMapper),
//   //   };
//   // }

//   /* ============================================================
//    GET ALL
// ============================================================ */
//   async findAll() {
//     const data = await this.sqlRepo.find();

//     return {
//       message: 'Contents fetched successfully',
//       total: data.length,
//       data: data.map(contentResponseMapper),
//     };
//   }
// }

// new version of code with the same structure and format
import {
  BadRequestException,
  // HttpException,
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
// import { QueryContentDto } from './dto/query-contents.dto';

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
        message: 'Content created successfully',
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

      throw new InternalServerErrorException('Content creation failed');
    }
  }

  /** Get All Contents */
  async _findAllSql() {
    try {
      const data = await this.sqlRepo!.find();

      return {
        message: 'Contents fetched successfully',
        total: data.length,
        data: data.map(contentResponseMapper),
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error({
          error: error.message,
          stack: error.stack,
        });
      }

      throw new InternalServerErrorException('Content fetch failed');
    }
  }

  /** Find One Content */
  async _findOneSql(contentId: string) {
    if (!isUUID(contentId)) {
      throw new BadRequestException('Invalid Content ID');
    }

    try {
      const entity = await this.sqlRepo!.findOne({
        where: { contentId },
      });

      if (!entity) {
        throw new NotFoundException('Content not found');
      }

      return {
        message: 'Content fetched successfully',
        data: contentResponseMapper(entity),
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error({
          error: error.message,
          stack: error.stack,
        });
      }

      throw new InternalServerErrorException('Content fetch failed');
    }
  }

  /** Remove Content */
  async _removeContentSql(contentId: string) {
    try {
      await this._findOneSql(contentId);

      await this.sqlRepo!.delete({ contentId });

      return {
        message: 'Content deleted successfully',
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.logger.error({
          error: error.message,
          stack: error.stack,
        });
      }

      throw new InternalServerErrorException('Content delete failed');
    }
  }
}
