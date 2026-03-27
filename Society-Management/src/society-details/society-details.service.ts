import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  Optional,
} from '@nestjs/common';

import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SOCIETY } from 'src/common/messages/specific.msg';
import { SocietySetupDetailsEntity } from './entities/society-details.entity';
import { societyDetailsResponseMapper } from './mappers/society-details.response.mapper';
import { CreateSocietySetupDetailsDto } from './dto/create-society-details.dto';
import { UpdateSocietyDetailsDto } from './dto/update-society-details.dto';
import { QuerySocietyDto } from './dto/query-society-details.dto';
import { SocietyAuditService } from 'src/audit/society-audit.service';
import { HTTP_METHOD } from 'src/common/constants/common.constant';
import { SocietyBlockEntity } from './entities/society-block.entity';
import { UserSocietyMapEntity } from 'src/user-society-map/entities/user-society-map.entities';
import { UsersEntity } from './entities/users.entity';

@Injectable()
export class SocietyDetailsService {
  private readonly logger = new Logger(SocietyDetailsService.name);

  constructor(
    private readonly societyAuditService: SocietyAuditService,
    @Optional()
    @InjectRepository(SocietySetupDetailsEntity)
    private readonly sqlRepo: Repository<SocietySetupDetailsEntity>,

    @InjectRepository(SocietyBlockEntity)
    private readonly blockRepo: Repository<SocietyBlockEntity>,

    private readonly dataSource: DataSource,
  ) {}

  async executeByDBType(fn: string, ...args: any[]) {
    const methodMap: Record<string, Function> = {
      create: this._createSql.bind(this),
      update: this._updateSql.bind(this),
      getAll: this._getAllSql.bind(this),
      getById: this._getByIdSql.bind(this),
    };

    const method = methodMap[fn];
    if (!method) {
      this.logger.error(`Invalid function call: ${fn}`);
      throw new InternalServerErrorException('Invalid operation');
    }

    return method(...args);
  }

  /* ---------- GET BY ID ---------- */

async _getByIdSql(societyId: string) {
  try {
    const entity = await this.sqlRepo
      .createQueryBuilder('s')

      /* -------- BLOCKS -------- */
      .leftJoinAndSelect(
        's.blocks',
        'b',
        'b.isDeleted = false AND b.status = 1',
      )

      /* -------- ADMIN MAP -------- */
      .leftJoinAndMapMany(
        's.admins',
        UserSocietyMapEntity,
        'a',
        'a.society_id = s.societyId AND a.is_active = true',
      )

      /* -------- USER DETAILS -------- */
      .leftJoinAndMapOne(
        'a.user',
        UsersEntity,
        'u',
        'u.id = a.user_id',
      )

      .where('s.societyId = :societyId', { societyId })
      .andWhere('s.isDeleted = false')
      .andWhere('s.status != 2')

      .getOne();

    if (!entity) {
      throw new NotFoundException(SOCIETY.ERRORS.SOCIETY_NOT_FOUND);
    }

    const data = societyDetailsResponseMapper(entity);

    return {
      ...data,
      message: SOCIETY.SUCCESS.SOCIETY_FETCHED,
    };
  } catch (err) {
    this.logger.error(
      `Fetch society failed | societyId=${societyId}`,
      err.stack,
    );

    if (err instanceof NotFoundException) throw err;

    throw new InternalServerErrorException(
      SOCIETY.ERRORS.FETCH_ONE_FAILED,
    );
  }
}

  /* ---------- GET ALL ---------- */

  async _getAllSql(query: QuerySocietyDto) {
    console.log('testi99999')
    try {
      const hasQuery =
        query.search ||
        query.page ||
        query.limit ||
        query.sortBy ||
        query.sortOrder;

      // const qb = this.sqlRepo
      //   .createQueryBuilder('s')
      //   .leftJoinAndSelect('s.blocks', 'b') // join blocks
      //   .where('s.isDeleted = false')
      //   .andWhere('s.status != 2')
      //   .andWhere('b.status = 1');
      // // .andWhere('(b.status = 1 OR b.status IS NULL)'); // optional if you use status

     const qb = this.sqlRepo
  .createQueryBuilder('s')
  .leftJoinAndSelect('s.blocks', 'b')

  /* ADMIN MAP */
  .leftJoinAndMapMany(
    's.admins',
    UserSocietyMapEntity,
    'a',
    'a.society_id = s.societyId AND a.is_active = true',
  )

  /* USER DETAILS */
  .leftJoinAndMapOne(
    'a.user',
    UsersEntity,
    'u',
    'u.id = a.user_id',
  )

  .where('s.isDeleted = false')
  .andWhere('s.status != 2')
  .andWhere('(b.status = 1 OR b.status IS NULL)');

      /* ---------- SEARCH ---------- */
      if (query.search) {
        qb.andWhere(
          `(s.societyName ILIKE :search
          OR s.societyCode ILIKE :search
          OR s.city ILIKE :search
          OR s.registrationNumber ILIKE :search)`,
          { search: `%${query.search}%` },
        );
      }

      /* ---------- SOCIETY LEVEL FILTER ---------- */
      if (query.societyLevel) {
        qb.andWhere('s.societyLevelCode = :societyLevelCode', {
          societyLevelCode: query.societyLevel,
        });
      }

      /* ---------- STATUS FILTER ---------- */
      if (query.status !== undefined) {
        qb.andWhere('s.status = :status', {
          status: Number(query.status),
        });
      }

      /* ---------- NO PAGINATION ---------- */
      if (!hasQuery) {
        const data = await qb.orderBy('s.createdAt', 'DESC').getMany();
        return {
          page: null,
          limit: null,
          total: data.length,
          totalPages: 1,
          message: SOCIETY.SUCCESS.SOCIETY_FETCHED,
          data: data.map(societyDetailsResponseMapper),
        };
      }

      /* ---------- PAGINATION ---------- */
      const page = Number(query.page) || 1;
      const limit = Number(query.limit) || 10;
      const skip = (page - 1) * limit;

      const allowedSortFields = [
        'createdAt',
        'societyName',
        'societyCode',
        'city',
        'status',
      ];

      const sortBy =
        query.sortBy && allowedSortFields.includes(query.sortBy)
          ? query.sortBy
          : 'createdAt';

      const sortOrder = query.sortOrder || 'DESC';

      qb.orderBy(`s.${sortBy}`, sortOrder).skip(skip).take(limit);

      const [data, total] = await qb.getManyAndCount();
      return {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        message: SOCIETY.SUCCESS.SOCIETY_FETCHED,
        data: data.map(societyDetailsResponseMapper),
      };
    } catch (error) {
      this.logger.error({
        message: 'Fetch societies failed',
        error: error.message,
        stack: error.stack,
        payload: query,
      });

      throw new InternalServerErrorException(SOCIETY.ERRORS.FETCH_FAILED);
    }
  }

  // separate block

  // async _createSql(dto: CreateSocietySetupDetailsDto, req: any) {
  //   const queryRunner = this.dataSource.createQueryRunner();

  //   await queryRunner.connect();
  //   await queryRunner.startTransaction();

  //   try {
  //     const userId =
  //       req?.user?.userId || 'a13a8a2b-3228-49d6-ad89-2b464c68c110';

  //     /*
  //     =============================
  //     Create Society
  //     =============================
  //   */
  //     const societyEntity = queryRunner.manager.create(
  //       SocietySetupDetailsEntity,
  //       {
  //         ...dto, // safe if entity does not have blocks field
  //         createdBy: userId,
  //       },
  //     );

  //     const savedSociety = await queryRunner.manager.save(
  //       SocietySetupDetailsEntity,
  //       societyEntity,
  //     );

  //     /*
  //     =============================
  //     Insert Blocks (if exists)
  //     =============================
  //   */
  //     const blocks = dto?.blocks || [];

  //     if (blocks.length > 0) {
  //       const blockEntities = blocks.map((block: any) =>
  //         queryRunner.manager.create(SocietyBlockEntity, {
  //           societyId: savedSociety.societyId,
  //           blockName: block.blockName,
  //           //  Random unique code combined with name
  //           blockCode: `${block.blockName
  //             ?.trim()
  //             .toUpperCase()
  //             .replace(/\s+/g, '')}-${Math.random()
  //             .toString(36)
  //             .substring(2, 6)}`,

  //           totalFloors: block.numberOfFloors ?? 0,
  //           totalFlats: block.totalFlats ?? 0,
  //           parkingSlot: block.parkingSlots ?? 0,
  //           blockType: block.blockType || null,
  //           status: 1,
  //           createdBy: userId,
  //         }),
  //       );

  //       await queryRunner.manager.save(SocietyBlockEntity, blockEntities);
  //     }

  //     /*
  //     =============================
  //      Commit Transaction
  //     =============================
  //   */
  //     await queryRunner.commitTransaction();

  //     /*
  //     =============================
  //      Audit (Non-blocking)
  //     =============================
  //   */
  //     // await this._auditSociety(
  //     //   {
  //     //     tableName : this.sqlRepo.metadata.tableName,
  //     //     action: HTTP_METHOD.CREATE,
  //     //     recordId: savedSociety.societyId,
  //     //     newData: savedSociety,
  //     //   },
  //     //   req,
  //     // );

  //     // 1 Audit Society
  //     await this._auditSociety(
  //       {
  //         tableName: queryRunner.manager.getRepository(
  //           SocietySetupDetailsEntity,
  //         ).metadata.tableName,
  //         action: HTTP_METHOD.CREATE,
  //         recordId: savedSociety.societyId,
  //         newData: savedSociety,
  //       },
  //       req,
  //     );

  //     // 2 Audit Blocks (if any)
  //     if (blocks.length > 0) {
  //       await this._auditSociety(
  //         {
  //           tableName:
  //             queryRunner.manager.getRepository(SocietyBlockEntity).metadata
  //               .tableName,
  //           action: HTTP_METHOD.CREATE,
  //           recordId: savedSociety.societyId, // parent reference
  //           newData: blocks,
  //         },
  //         req,
  //       );
  //     }

  //     const data = societyDetailsResponseMapper(savedSociety);

  //     return {
  //       ...data,
  //       message: SOCIETY.SUCCESS.SOCIETY_CREATED,
  //     };
  //   } catch (err) {
  //     await queryRunner.rollbackTransaction();
  //     this.logger.error('Society creation failed', err.stack);

  //     if (err?.code === '23505') {
  //       throw new BadRequestException(
  //         'Duplicate society code, registration number, or block code found',
  //       );
  //     }

  //     throw new InternalServerErrorException(SOCIETY.ERRORS.CREATE_FAILED);
  //   } finally {
  //     await queryRunner.release();
  //   }
  // }

async _createSql(dto: CreateSocietySetupDetailsDto, req: any) {
  const queryRunner = this.dataSource.createQueryRunner();

  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    const userId =
      req?.user?.userId || 'a13a8a2b-3228-49d6-ad89-2b464c68c110';

    /*
    =============================
    Extract DTO fields
    =============================
    */
    const { blocks, adminDetails, ...societyFields } = dto;

    /*
    =============================
    Create Society
    =============================
    */
    const societyEntity = queryRunner.manager.create(
      SocietySetupDetailsEntity,
      {
        ...societyFields,
        createdBy: userId,
      },
    );

    const savedSociety = await queryRunner.manager.save(
      SocietySetupDetailsEntity,
      societyEntity,
    );

    /*
    =============================
    Insert Blocks
    =============================
    */
    let savedBlocks: SocietyBlockEntity[] = [];

    if (blocks?.length) {
      const blockEntities = blocks.map((block: any) =>
        queryRunner.manager.create(SocietyBlockEntity, {
          societyId: savedSociety.societyId,
          blockName: block.blockName,
          blockCode: `${block.blockName
            ?.trim()
            .toUpperCase()
            .replace(/\s+/g, '')}-${Math.random()
            .toString(36)
            .substring(2, 6)}`,
          totalFloors: block.numberOfFloors ?? 0,
          totalFlats: block.totalFlats ?? 0,
          parkingSlot: block.parkingSlots ?? 0,
          blockType: block.blockType || null,
          status: 1,
          createdBy: userId,
        }),
      );

      savedBlocks = await queryRunner.manager.save(
        SocietyBlockEntity,
        blockEntities,
      );
    }

    /*
    =============================
    Insert Admin Users
    =============================
    */

    let savedAdmins: UserSocietyMapEntity[] = [];

    if (adminDetails?.length) {
      const adminEntities = adminDetails.map((admin) =>
        queryRunner.manager.create(UserSocietyMapEntity, {
          user_id: admin.userId,
          society_id: savedSociety.societyId,
          user_role: admin.roleName,
          created_by: userId,
          is_active: true,
        }),
      );

      savedAdmins = await queryRunner.manager.save(
        UserSocietyMapEntity,
        adminEntities,
      );
    }

    /*
    =============================
    Commit Transaction
    =============================
    */
    await queryRunner.commitTransaction();

    /*
    =============================
    Audit Society
    =============================
    */

    await this._auditSociety(
      {
        tableName:
          queryRunner.manager.getRepository(SocietySetupDetailsEntity)
            .metadata.tableName,
        action: HTTP_METHOD.CREATE,
        recordId: savedSociety.societyId,
        newData: savedSociety,
      },
      req,
    );

    /*
    =============================
    Audit Blocks
    =============================
    */

    if (savedBlocks.length) {
      for (const block of savedBlocks) {
        await this._auditSociety(
          {
            tableName:
              queryRunner.manager.getRepository(SocietyBlockEntity)
                .metadata.tableName,
            action: HTTP_METHOD.CREATE,
            recordId: block.blockId,
            newData: block,
          },
          req,
        );
      }
    }

    /*
    =============================
    Audit Admin Mapping
    =============================
    */

    if (savedAdmins.length) {
      for (const admin of savedAdmins) {
        await this._auditSociety(
          {
            tableName:
              queryRunner.manager.getRepository(UserSocietyMapEntity)
                .metadata.tableName,
            action: HTTP_METHOD.CREATE,
            recordId: admin.id,
            newData: admin,
          },
          req,
        );
      }
    }

    const data = societyDetailsResponseMapper(savedSociety);

    return {
      ...data,
      message: SOCIETY.SUCCESS.SOCIETY_CREATED,
    };
  } catch (err) {
    await queryRunner.rollbackTransaction();
    this.logger.error('Society creation failed', err.stack);

    if (err?.code === '23505') {
      throw new BadRequestException(
        'Duplicate society code, registration number, block code or user already mapped',
      );
    }

    throw new InternalServerErrorException(SOCIETY.ERRORS.CREATE_FAILED);
  } finally {
    await queryRunner.release();
  }
}




async _updateSql(societyId: string, dto: UpdateSocietyDetailsDto, req: any) {
  const queryRunner = this.dataSource.createQueryRunner();

  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    const userId =
      req?.user?.userId || 'a13a8a2b-3228-49d6-ad89-2b464c68c110';

    /*
    ==================================================
    1 Fetch Society
    ==================================================
    */
    const society = await queryRunner.manager.findOne(
      SocietySetupDetailsEntity,
      { where: { societyId, isDeleted: false } },
    );

    if (!society) {
      throw new NotFoundException(SOCIETY.ERRORS.SOCIETY_NOT_FOUND);
    }

    const oldData = JSON.parse(JSON.stringify(society));

    /*
    ==================================================
    2 PATCH Society Fields
    ==================================================
    */
    const { blocks, ...societyFields } = dto;

    const filteredFields = Object.fromEntries(
      Object.entries(societyFields).filter(
        ([_, value]) => value !== undefined,
      ),
    );

    Object.assign(society, filteredFields);
    society.updatedBy = userId;

    const savedSociety = await queryRunner.manager.save(
      SocietySetupDetailsEntity,
      society,
    );

    /*
    ==================================================
    3 FULL SYNC Blocks + Audit Capture
    ==================================================
    */
    const blockAudits: any[] = [];

    if (dto.blocks) {
      const existingBlocks = await queryRunner.manager.find(
        SocietyBlockEntity,
        { where: { societyId, isDeleted: false } },
      );

      const existingBlockMap = new Map(
        existingBlocks.map((b) => [b.blockCode, b]),
      );

      const incomingBlockCodes = new Set<string>();

      for (const block of dto.blocks) {
        const existing = block.blockCode
          ? existingBlockMap.get(block.blockCode)
          : undefined;

        /*
        ==============================
        UPDATE EXISTING BLOCK
        ==============================
        */
        if (existing) {
          const oldBlockData = JSON.parse(JSON.stringify(existing));

          const updatePayload: any = { updatedBy: userId };

          if (block.blockName !== undefined)
            updatePayload.blockName = block.blockName;

          if (block.numberOfFloors !== undefined)
            updatePayload.totalFloors = block.numberOfFloors;

          if (block.totalFlats !== undefined)
            updatePayload.totalFlats = block.totalFlats;

          if (block.parkingSlots !== undefined)
            updatePayload.parkingSlot = block.parkingSlots;

          if (block.blockType !== undefined)
            updatePayload.blockType = block.blockType;

          await queryRunner.manager.update(
            SocietyBlockEntity,
            { blockId: existing.blockId },
            updatePayload,
          );

          const updatedBlock = {
            ...existing,
            ...updatePayload,
          };

          blockAudits.push({
            action: HTTP_METHOD.UPDATE,
            recordId: existing.blockId,
            oldData: oldBlockData,
            newData: updatedBlock,
          });

          incomingBlockCodes.add(block.blockCode);
        }

        /*
        ==============================
        INSERT NEW BLOCK
        ==============================
        */
        else {
          if (!block.blockName) {
            throw new BadRequestException(
              'blockName is required for new block',
            );
          }

          const newBlock = queryRunner.manager.create(
            SocietyBlockEntity,
            {
              societyId,
              blockName: block.blockName,
              blockCode: `${block.blockName
                .trim()
                .toUpperCase()
                .replace(/\s+/g, '')}-${Math.random()
                .toString(36)
                .substring(2, 6)}`,
              totalFloors: block.numberOfFloors ?? 0,
              totalFlats: block.totalFlats ?? 0,
              parkingSlot: block.parkingSlots ?? 0,
              blockType: block.blockType ?? undefined,
              status: 1,
              isDeleted: false,
              createdBy: userId,
            },
          );

          const savedBlock = await queryRunner.manager.save(
            SocietyBlockEntity,
            newBlock,
          );

          blockAudits.push({
            action: HTTP_METHOD.CREATE,
            recordId: savedBlock.blockId,
            oldData: null,
            newData: savedBlock,
          });

          incomingBlockCodes.add(savedBlock.blockCode);
        }
      }

      /*
      ==============================
      SOFT DELETE BLOCKS
      ==============================
      */
      for (const existing of existingBlocks) {
        if (!incomingBlockCodes.has(existing.blockCode)) {
          const oldBlockData = JSON.parse(JSON.stringify(existing));

          await queryRunner.manager.update(
            SocietyBlockEntity,
            { blockId: existing.blockId },
            {
              isDeleted: true,
              status: 2,
              updatedBy: userId,
            },
          );

          blockAudits.push({
            action: HTTP_METHOD.DELETE,
            recordId: existing.blockId,
            oldData: oldBlockData,
            newData: { ...existing, isDeleted: true, status: 2 },
          });
        }
      }
    }

    /*
==================================================
4 FULL SYNC Admins (user_society_map)
==================================================
*/

const adminAudits: any[] = [];

if (dto.adminDetails) {
  const existingAdmins = await queryRunner.manager.find(
  UserSocietyMapEntity,
  {
    where: {
      society_id: societyId,
    },
  },
);

  const existingAdminMap = new Map(
    existingAdmins.map((a) => [a.user_id, a]),
  );

  const incomingUserIds = new Set<string>();

  for (const admin of dto.adminDetails) {
    const existing = existingAdminMap.get(admin.userId);

    /*
    ==============================
    UPDATE EXISTING ADMIN
    ==============================
    */
   
  if (existing) {
  const oldAdmin = JSON.parse(JSON.stringify(existing));

  const updatePayload: any = {
    user_role: admin.roleName,
    is_active: true,
    updated_by: userId,
  };

  await queryRunner.manager.update(
    UserSocietyMapEntity,
    { id: existing.id },
    updatePayload,
  );

      adminAudits.push({
        action: HTTP_METHOD.UPDATE,
        recordId: existing.id,
        oldData: oldAdmin,
        newData: { ...existing, ...updatePayload },
      });

      incomingUserIds.add(admin.userId);
    }

    /*
    ==============================
    INSERT NEW ADMIN
    ==============================
    */
    else {
      const newAdmin = queryRunner.manager.create(
        UserSocietyMapEntity,
        {
          user_id: admin.userId,
          society_id: societyId,
          user_role: admin.roleName,
          created_by: userId,
          is_active: true,
        },
      );

      const savedAdmin = await queryRunner.manager.save(
        UserSocietyMapEntity,
        newAdmin,
      );

      adminAudits.push({
        action: HTTP_METHOD.CREATE,
        recordId: savedAdmin.id,
        oldData: null,
        newData: savedAdmin,
      });

      incomingUserIds.add(savedAdmin.user_id);
    }
  }

  /*
  ==============================
  DEACTIVATE REMOVED ADMINS
  ==============================
  */
  for (const existing of existingAdmins) {
    if (!incomingUserIds.has(existing.user_id)) {
      const oldAdmin = JSON.parse(JSON.stringify(existing));

      await queryRunner.manager.update(
        UserSocietyMapEntity,
        { id: existing.id },
        {
          is_active: false,
          updated_by: userId,
        },
      );

      adminAudits.push({
        action: HTTP_METHOD.DELETE,
        recordId: existing.id,
        oldData: oldAdmin,
        newData: { ...existing, is_active: false },
      });
    }
  }
}

    /*
    ==================================================
    4 Commit
    ==================================================
    */
    await queryRunner.commitTransaction();

    /*
    ==================================================
    5 Audit Society
    ==================================================
    */
    await this._auditSociety(
      {
        tableName: this.sqlRepo.metadata.tableName,
        action: HTTP_METHOD.UPDATE,
        recordId: societyId,
        oldData,
        newData: savedSociety,
      },
      req,
    );

    /*
    ==================================================
    6 Audit Blocks (One Row Per Block)
    ==================================================
    */
    for (const audit of blockAudits) {
      await this._auditSociety(
        {
          tableName: 'society_block',
          action: audit.action,
          recordId: audit.recordId,
          oldData: audit.oldData,
          newData: audit.newData,
        },
        req,
      );
    }

    /*
==================================================
Audit Admins
==================================================
*/

for (const audit of adminAudits) {
  await this._auditSociety(
    {
      tableName: 'user_society_map',
      action: audit.action,
      recordId: audit.recordId,
      oldData: audit.oldData,
      newData: audit.newData,
    },
    req,
  );
}

    const data = societyDetailsResponseMapper(savedSociety);

    return {
      ...data,
      message: SOCIETY.SUCCESS.SOCIETY_UPDATED,
    };
  } catch (err) {
    await queryRunner.rollbackTransaction();
    this.logger.error(`Society update failed: ${societyId}`, err.stack);

    if (err instanceof NotFoundException) throw err;

    if (err?.code === '23505') {
      throw new BadRequestException(
        'Duplicate society code, registration number, or block name found',
      );
    }

    throw new InternalServerErrorException(
      SOCIETY.ERRORS.UPDATE_FAILED,
    );
  } finally {
    await queryRunner.release();
  }
}

  // helper function
 
  async _auditSociety(
    params: {
      tableName: any;
      action: 'CREATE' | 'UPDATE' | 'DELETE';
      recordId: string;
      oldData?: any;
      newData?: any;
    },
    req: any,
  ) {
    try {
      await this.societyAuditService.auditLog({
        recordId: params.recordId,
        tableName: params.tableName,
        action: params.action,

        oldData: params.oldData ?? null,
        newData: params.newData ?? null,

        changedBy: req?.user?.userId || null,
        ipAddress: req?.ip || null,
        platform: req?.headers['user-agent'] || null,
      });
    } catch (auditErr) {
      this.logger.warn(`Society Audit log failed (${params.action})`, auditErr);
    }
  }
}
