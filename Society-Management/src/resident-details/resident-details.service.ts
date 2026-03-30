import { BadRequestException, Injectable, Logger, InternalServerErrorException, NotFoundException, HttpException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ResidentDetails } from './entities/resident-details.entities';
import { CreateResidentMapDto } from './dto/create-resident-details.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { USERRESIDENTMAP } from 'src/common/messages/specific.msg';
import { residentDetailsReqMapper } from "./mapper/resident-details.request.mapper";
import { residentDetailsResMapper } from "./mapper/resident-details.response.mapper";
import { isUUID } from 'class-validator';
// import { UserSqlEntity } from '@sms/db-entities';
@Injectable()
export class ResidentDetailsService {
    private readonly logger = new Logger(ResidentDetailsService.name);
    constructor(
        @InjectRepository(ResidentDetails)
        private readonly sqlRepo: Repository<ResidentDetails>,
        private readonly dataSource: DataSource,
        // private readonly sqlIdentityRepo: Repository<UserSqlEntity>,
    ) { }

    executeByActionType(fn: string, ...args: any[]) {
        const methodMap: Record<string, Function> = {
            create: this._createSql.bind(this),
            update: this._updateSql.bind(this),
            getById: this._getByIdSql.bind(this),
            getAll: this._getAll.bind(this)
        };

        const method = methodMap[fn];
        if (!method) throw new Error(`Invalid function: ${fn}`);
        return method(...args);
    }

    async _createSql(data: CreateResidentMapDto, req: any) {

        try {
            const [seq] = await this.dataSource?.query(`
            SELECT 
                society_management.get_society_block_sequence($1, '', 'societySeq') AS society_seq,
                society_management.get_society_block_sequence($1, $2, 'blockSeq') AS block_seq,
                society_management.get_society_block_sequence('', $2, 'residentSeq') AS resident_seq`,
                [
                    data.societyId,
                    data.blockId,
                ]);

            const memberId = `${new Date().getFullYear()}-${seq.society_seq}-${seq.block_seq}-${seq.resident_seq}`;
            const mappedEntity = residentDetailsReqMapper(data);

            const entity = this.sqlRepo!.create({
                ...mappedEntity,
                member_id: memberId,
                created_by: req.user.userId
            });

            await this.sqlRepo!.save(entity);

            return { message: USERRESIDENTMAP.SUCCESS.RESIDENT_CREATED };

        } catch (error) {
            this.logger.error({
                error: error.message,
                stack: error.stack
            });
            throw new InternalServerErrorException(
                USERRESIDENTMAP.ERRORS.CREATE_FAILED
            );
        }
    }
    async _updateSql(data: CreateResidentMapDto, req: any) {
        delete (data as any).createdBy;
        delete (data as any).createdAt;
        const residentId = data.residentId
        const mappedEntity = residentDetailsReqMapper(data);

        const isPresent = await this._findOne(residentId)
        if (!isPresent) {
            throw new NotFoundException(USERRESIDENTMAP.ERRORS.RESIDENT_NOT_FOUND);
        }
        const result = await this.sqlRepo.update({ resident_uuid: residentId }, { ...mappedEntity, updated_by: req.user.userId });
        if (result.affected === 0) {
            throw new NotFoundException(USERRESIDENTMAP.ERRORS.RESIDENT_NOT_FOUND);
        }
        const updatedData = await this._getByIdSql(residentId);
        return { ...updatedData, message: USERRESIDENTMAP.SUCCESS.RESIDENT_UPDATED }
    }

    async _getByIdSql(residentId: string) {
        if (!residentId) {
            throw new BadRequestException('Resident id is required');
        }
        try {
            const result = await this.dataSource.query(`
                SELECT 
                    rd.resident_uuid,
                    rd.member_id,
                    rd.block_id,
                    rd.flat_number,
                    rd.owner_type,
                    rd.move_in_date,
                    rd.emergency_contact,
                    rd.id_proof_type,
                    rd.id_proof_doc,
                    rd.profile_pic,
                    rsm.id,
                    rsm.society_id,
                    u.mobile,
                    u.name,
                    u.email,
                    u.status
                FROM society_management.resident_details rd
                LEFT JOIN society_management.user_society_map rsm 
                    ON rd.resident_uuid = rsm.user_id
                LEFT JOIN identity.users u 
                    ON u.id = rsm.user_id
                WHERE rd.resident_uuid = $1
            `, [residentId]);
            const data = residentDetailsResMapper(result[0]);

            return {
                ...data,
                message: USERRESIDENTMAP.SUCCESS.RESIDENT_FETCHED,
            };
        } catch (error) {
            this.logger.error({
                error: error.message,
                stack: error.stack,
            });
            throw new InternalServerErrorException(
                USERRESIDENTMAP.ERRORS.FETCH_FAILED
            );
        }
    }

    async _getAll(query: any) {
        try {
            const page = Number(query.page) || 1;
            const limit = Number(query.limit) || 10;
            const skip = (page - 1) * limit;

            const search = query.search || '';
            const ownerType = query.ownerType;
            const status = query.status;

            let conditions: string[] = [];
            let values: any[] = [];
            let index = 1;

            // 🔎 Search
            if (search) {
                conditions.push(`(
                u.name ILIKE $${index} OR
                u.mobile ILIKE $${index} OR
                u.email ILIKE $${index}
            )`);
                values.push(`%${search}%`);
                index++;
            }

            // 🎯 Owner Type Filter
            if (ownerType) {
                conditions.push(`rd.owner_type = $${index}`);
                values.push(ownerType);
                index++;
            }

            // 🎯 Status Filter
            if (status) {
                conditions.push(`u.status = $${index}`);
                values.push(status);
                index++;
            }

            const whereClause = conditions.length
                ? `WHERE ${conditions.join(' AND ')}`
                : '';

            // 🔹 Main Data Query
            const result = await this.dataSource.query(
                `
            SELECT 
                rd.resident_uuid,
                rd.member_id,
                rd.block_id,
                rd.flat_number,
                rd.owner_type,
                rd.move_in_date,
                rd.emergency_contact,
                rd.id_proof_type,
                rd.id_proof_doc,
                rd.profile_pic,
                rsm.id,
                rsm.society_id,
                u.mobile,
                u.name,
                u.email,
                u.status
            FROM society_management.resident_details rd
            LEFT JOIN society_management.user_society_map rsm 
                ON rd.resident_uuid = rsm.user_id
            LEFT JOIN identity.users u 
                ON u.id = rsm.user_id
            ${whereClause}
            ORDER BY rd.created_at DESC
            LIMIT $${index} OFFSET $${index + 1}
            `,
                [...values, limit, skip]
            );

            // 🔹 Count Query
            const countResult = await this.dataSource.query(
                `
            SELECT COUNT(*) AS total
            FROM society_management.resident_details rd
            LEFT JOIN society_management.user_society_map rsm 
                ON rd.resident_uuid = rsm.user_id
            LEFT JOIN identity.users u 
                ON u.id = rsm.user_id
            ${whereClause}
            `,
                values
            );

            const total = Number(countResult[0]?.total || 0);

            const data = result.map(residentDetailsResMapper);

            return {
                data,
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
                message: USERRESIDENTMAP.SUCCESS.RESIDENT_FETCHED,
            };

        } catch (error) {
            this.logger.error({
                error: error.message,
                stack: error.stack,
            });
            throw new InternalServerErrorException(
                USERRESIDENTMAP.ERRORS.FETCH_FAILED
            );
        }
    }

    async _findOne(residentId: string) {
        if (!isUUID(residentId)) {
            throw new BadRequestException(USERRESIDENTMAP.ERRORS.INVALID_ID);
        }
        try {
            const residentDetails = await this.sqlRepo!.findOne({ where: { resident_uuid: residentId } });
            if (!residentDetails) {
                throw new NotFoundException(USERRESIDENTMAP.ERRORS.RESIDENT_NOT_FOUND);
            }
            return { residentDetails, message: USERRESIDENTMAP.SUCCESS.RESIDENT_FETCHED };
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            this.logger.error({
                error: error.message,
                stack: error.stack,
                payload: residentId,
            });
            throw new InternalServerErrorException(USERRESIDENTMAP.ERRORS.FETCH_FAILED)
        }
    }
}
