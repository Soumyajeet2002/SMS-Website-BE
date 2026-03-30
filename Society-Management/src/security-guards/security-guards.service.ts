import {
  Injectable,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import { SecurityGuardsEntity } from './entities/security-guards.entities';
import { SocietySetupDetailsEntity } from '../society-details/entities/society-details.entity';
import { CreateSecurityGuardsDto } from './dto/create-security-guards.dto';
import { GetSecurityGuardsDto } from './dto/query-security-guards.dto';
import { securityGuardsResponseMapper } from './mapper/security-guards-response.mapper';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SECURITYGUARDS } from 'src/common/messages/specific.msg';
import { securityGuardsReqMapper } from './mapper/security-guards.request.mapper';
@Injectable()
export class SecurityGuardsService {
  private readonly logger = new Logger(SecurityGuardsService.name);
  constructor(
    @InjectRepository(SecurityGuardsEntity)
    private readonly sqlRepo: Repository<SecurityGuardsEntity>,

    @InjectRepository(SocietySetupDetailsEntity)
    private readonly societyRepo: Repository<SocietySetupDetailsEntity>,
  ) {}

  executeByActionType(fn: string, ...args: any[]) {
    const methodMap: Record<string, Function> = {
      create: this._createSql.bind(this),
      findAll: this._findAllSql.bind(this),
    };

    const method = methodMap[fn];
    if (!method) throw new Error(`Invalid function: ${fn}`);
    return method(...args);
  }

  async _createSql(data: CreateSecurityGuardsDto, req: any) {
    const societyId = req.user.societyId;

    const society = await this.societyRepo.findOne({
      where: { societyId: societyId },
    });

    if (!society) {
      throw new Error('Society not found');
    }

    const employeeCode = this.generateEmployeeCode(society.societyCode);

    const mappedEntity = securityGuardsReqMapper(data);

    try {
      const entity = this.sqlRepo!.create({
        ...mappedEntity,
        employeeCode,
        createdBy: req.user.userId,
      });
      await this.sqlRepo!.save(entity);
      return { message: SECURITYGUARDS.SUCCESS.SECURITY_GUARDS_CREATED };
    } catch (error) {
      this.logger.error({
        error: error.message,
        stack: error.stack,
        payload: data,
      });
      throw new InternalServerErrorException(
        SECURITYGUARDS.ERRORS.CREATE_FAILED,
      );
    }
  }

 async _findAllSql(query: any) {
  try {
    const hasQuery =
      query.search ||
      query.page ||
      query.limit ||
      query.sortBy ||
      query.sortOrder;

    const queryBuilder = this.sqlRepo.createQueryBuilder('sg');

    // ✅ Exclude deleted (status = 2)
    queryBuilder.where('sg.status != :deletedStatus', {
      deletedStatus: 2,
    });

    // ✅ Search (you can extend fields)
    if (query.search) {
      queryBuilder.andWhere(
        `(sg.employee_code ILIKE :s OR sg.designation ILIKE :s OR sg.id_number ILIKE :s)`,
        { s: `%${query.search}%` },
      );
    }

    // ✅ Case 1: No query → return all
    if (!hasQuery) {
      const data = await queryBuilder.getMany();
      const finalData = data.map(securityGuardsResponseMapper);

      return {
        page: null,
        limit: null,
        total: data.length,
        totalPages: 1,
        data: finalData,
        message: SECURITYGUARDS.SUCCESS.SECURITY_GUARDS_FETCHED,
      };
    }

    // ✅ Case 2: Pagination
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;

    // ⚠️ FIX (you had bug here)
    const sortBy = query.sortBy || 'created_at';
    const sortOrder = (query.sortOrder || 'DESC') as 'ASC' | 'DESC';

    const skip = (page - 1) * limit;

    queryBuilder
      .orderBy(`sg.${sortBy}`, sortOrder)
      .skip(skip)
      .take(limit);

    const [data, total] = await queryBuilder.getManyAndCount();
    const finalData = data.map(securityGuardsResponseMapper);

    return {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      data: finalData,
      message: SECURITYGUARDS.SUCCESS.SECURITY_GUARDS_FETCHED,
    };
  } catch (error) {
    this.logger.error({
      error: error.message,
      stack: error.stack,
      payload: query,
    });

    throw new InternalServerErrorException(
      SECURITYGUARDS.ERRORS.FETCH_FAILED,
    );
  }
}


  private generateEmployeeCode(societyCode: string): string {
    const companyCode = 'PTPL';
    const year = new Date().getFullYear();
    const random = Math.floor(1000 + Math.random() * 9000);

    return `${companyCode}-${societyCode}-${year}-${random}`;
  }
}
