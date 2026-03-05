import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ContentEntity } from './entities/content.entity';
import { CreateContentDto } from './dto/create-content.dto';
import { contentResponseMapper } from './mappers/content.response.mapper';
// import { QueryContentDto } from './dto/query-contents.dto';

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(ContentEntity)
    private readonly sqlRepo: Repository<ContentEntity>,
  ) {}
  // executableByActionType(fn: string, ...args: any[]) {
  //   const methodMap: Record<string, Function> = {
  //     create: this._createContentservice.bind(this),
  //     findAll: this._findAllsql.bind(this),
  //     findONe: this._findonesql.bind(this),
  //     remove: this._removedatasql.bind(this),
  //   };
  //   const method = methodMap(fn);
  //   if (!method) throw new Error(`Invalid function: ${fn}`);
  //   return method(...args);
  // }
  /* ============================================================
     CREATE
  ============================================================ */
  async create(dto: CreateContentDto, req: any) {
    try {
      console.log('Creating content with DTO:');
      const entity = this.sqlRepo.create({
        ...dto,
        currentVersionNo: 1,
        workingVersionNo: 1,
        createdBy: req?.user?.userId,
      });

      const saved = await this.sqlRepo.save(entity);

      return {
        message: 'Content created successfully',
        data: contentResponseMapper(saved),
      };
    } catch (error) {
      // Postgres duplicate key error
      if (error?.code === '23505') {
        throw new BadRequestException('Duplicate slug');
      }

      throw new InternalServerErrorException('Content creation failed');
    }
  }

  /* ============================================================
     GET BY ID
  ============================================================ */
  async findOne(contentId: string) {
    const entity = await this.sqlRepo.findOne({
      where: { contentId },
    });

    if (!entity) {
      throw new NotFoundException('Content not found');
    }

    return {
      message: 'Content fetched successfully',
      data: contentResponseMapper(entity),
    };
  }

  /* ============================================================
     GET ALL
  ============================================================ */

  // async findAll(query: QueryContentDto) {
  //   const qb = this.sqlRepo.createQueryBuilder('c');

  //   // Optional search
  //   if (query.search) {
  //     qb.andWhere('c.title ILIKE :search', {
  //       search: `%${query.search}%`,
  //     });
  //   }

  //   // Pagination
  //   const page = Number(query.page) || 1;
  //   const limit = Number(query.limit) || 10;
  //   const skip = (page - 1) * limit;

  //   // Sorting
  //   const sortBy = query.sortBy || 'createdAt';
  //   const sortOrder = query.sortOrder?.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

  //   qb.orderBy(`c.${sortBy}`, sortOrder).skip(skip).take(limit);

  //   const [data, total] = await qb.getManyAndCount();

  //   return {
  //     page,
  //     limit,
  //     total,
  //     totalPages: Math.ceil(total / limit),
  //     message: 'Contents fetched successfully',
  //     data: data.map(contentResponseMapper),
  //   };
  // }

  /* ============================================================
   GET ALL
============================================================ */
  async findAll() {
    const data = await this.sqlRepo.find();

    return {
      message: 'Contents fetched successfully',
      total: data.length,
      data: data.map(contentResponseMapper),
    };
  }
}
