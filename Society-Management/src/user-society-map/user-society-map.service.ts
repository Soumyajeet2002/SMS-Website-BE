import { BadRequestException, ConflictException, HttpException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { CreateUserSocietyMapDto } from './dto/create-user-society-map.dto';
import { UpdateUserSocietyMapDto } from './dto/update-user-society-map.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSocietyMapEntity } from './entities/user-society-map.entities';
import { Repository } from 'typeorm';
import { userSocietyReqMapper } from './mappers/user-society.request.mapper';
import { USERSOCIETYMAP } from 'src/common/messages/specific.msg';
import { isUUID } from 'class-validator';
import { userSocietyResponseMapper } from './mappers/user-society.response.mapper';
import { userSocietyAllResponseMapper } from './mappers/user-society.getAll.response';

@Injectable()
export class UserSocietyMapService {

    private readonly logger = new Logger(UserSocietyMapService.name);

    constructor(
        @InjectRepository(UserSocietyMapEntity)
        private readonly sqlRepo?: Repository<UserSocietyMapEntity>
    ) { }

    executeByActionType(fn: string, ...args: any[]) {
        const methodMap: Record<string, Function> = {
            create: this._createSql.bind(this),
            findOneInternal: this._findOne.bind(this),
            find: this._findSql.bind(this),
            findAll: this._findAllSql.bind(this),
            update: this._updateSql.bind(this),
            remove: this._removeSql.bind(this),
        };

        const method = methodMap[fn];
        if (!method) throw new Error(`Invalid function: ${fn}`);
        return method(...args);
    }

    async _createSql(data: CreateUserSocietyMapDto, req: any) {
        const mappedEntity = userSocietyReqMapper(data);
        try {
            const existing = await this.sqlRepo!.findOne({
                where: {
                    user_id: mappedEntity.user_id,
                    society_id: mappedEntity.society_id
                }
            });

            if (existing) {
                throw new ConflictException(USERSOCIETYMAP.ERRORS.ALREADY_MAPPED);
            }
            const entity = this.sqlRepo!.create({ ...mappedEntity, created_by: req.user.userId });
            await this.sqlRepo!.save(entity);
            return { success:true,message: USERSOCIETYMAP.SUCCESS.USERMAP_CREATED }
        } catch (error) {
            this.logger.error({
                error: error.message,
                stack: error.stack,
                payload: data,
            });
            throw new InternalServerErrorException(USERSOCIETYMAP.ERRORS.CREATE_FAILED);
        }
    }

    async _findOne(id: string) {
        if (!isUUID(id)) {
            throw new BadRequestException(USERSOCIETYMAP.ERRORS.INVALID_ID);
        }
        try {
            const mapped = await this.sqlRepo!.findOne({ where: { id } });
            if (!mapped) {
                throw new NotFoundException(USERSOCIETYMAP.ERRORS.MAP_NOT_FOUND);
            }
            let data = userSocietyResponseMapper(mapped)
            return { ...data, message: USERSOCIETYMAP.SUCCESS.USERMAP_FETCHED };
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }
            this.logger.error({
                error: error.message,
                stack: error.stack,
                payload: id,
            });
            throw new InternalServerErrorException(USERSOCIETYMAP.ERRORS.FETCH_FAILED)
        }
    }

    async _findSql(body: { userId?: string; societyId?: string }) {

        const { userId, societyId } = body;

        if (!userId && !societyId) {
            throw new BadRequestException('Either userId or societyId is required');
        }

        if (userId && !isUUID(userId)) {
            throw new BadRequestException(USERSOCIETYMAP.ERRORS.INVALID_ID);
        }

        if (societyId && !isUUID(societyId)) {
            throw new BadRequestException(USERSOCIETYMAP.ERRORS.INVALID_ID);
        }

        try {

            let condition = '';
            const params: any[] = [];

            if (userId) {
                condition = 'usm.user_id = $1';
                params.push(userId);
            } else {
                condition = 'usm.society_id = $1';
                params.push(societyId);
            }

            const query = `
            SELECT 
                usm.id,
                usm.user_id AS "userId",
                u.name AS "userName",
                u.mobile AS "mobileNumber",
                u.email AS "emailId",
                usm.society_id AS "societyId",
                ssd.society_name AS "societyName",
                ssd.society_type AS "societyType",
                ssd.establishment_year AS "establistmentYear",
                usm.user_role AS "userRole",
                usm.is_active AS "isActive"
            FROM society_management.user_society_map usm
            LEFT JOIN identity.users u
                ON u.id = usm.user_id
            LEFT JOIN society_management.society_setup_details ssd
                ON ssd.society_id = usm.society_id
            WHERE ${condition}
              AND usm.is_active = true
        `;

            const result = await this.sqlRepo!.query(query, params);

            if (!result.length) {
                throw new NotFoundException(USERSOCIETYMAP.ERRORS.MAP_NOT_FOUND);
            }

            return {
                ...result[0],
                message: USERSOCIETYMAP.SUCCESS.USERMAP_FETCHED
            };

        } catch (error) {

            if (error instanceof HttpException) {
                throw error;
            }

            this.logger.error({
                error: error.message,
                stack: error.stack,
                payload: body,
            });

            throw new InternalServerErrorException(USERSOCIETYMAP.ERRORS.FETCH_FAILED);
        }
    }

    async _findAllSql() {
        try {

            const query = `
      SELECT 
          usm.id,
          usm.user_role AS "userRole",
          usm.user_id AS "userId",
          u.name AS "userName",
          u.mobile AS "mobileNumber",
          u.email AS "emailId",
          usm.society_id AS "societyId",
          ssd.society_name AS "societyName",
          ssd.society_type AS "societyType",
          ssd.establishment_year AS "establishmentYear",
          usm.is_active AS "isActive"
      FROM society_management.user_society_map usm
      LEFT JOIN identity.users u
          ON u.id = usm.user_id
      LEFT JOIN society_management.society_setup_details ssd
          ON ssd.society_id = usm.society_id
      WHERE usm.is_active = true
    `;

            const result = await this.sqlRepo!.query(query);

            if (!result.length) {
                throw new NotFoundException(USERSOCIETYMAP.ERRORS.MAP_NOT_FOUND);
            }

            return {
                data: userSocietyAllResponseMapper(result),
                message: USERSOCIETYMAP.SUCCESS.USERMAP_FETCHED
            };

        } catch (error) {

            if (error instanceof HttpException) {
                throw error;
            }

            this.logger.error({
                error: error.message,
                stack: error.stack,
                payload: 'fetch-all-user-society-map',
            });

            throw new InternalServerErrorException(
                USERSOCIETYMAP.ERRORS.FETCH_FAILED
            );
        }
    }

    async _updateSql(id: string, data: UpdateUserSocietyMapDto, req: any) {
        try {
            //Should not update these values.
            delete (data as any).createdBy;
            delete (data as any).createdAt;

            const mappedEntity = userSocietyReqMapper(data);

            const isPresent = await this._findOne(id)

            if (!isPresent) {
                throw new NotFoundException(USERSOCIETYMAP.ERRORS.MAP_NOT_FOUND);
            }
            const result = await this.sqlRepo!.update(id, { ...mappedEntity, updated_by: req.user.userId })
            const updatedData = await this._findOne(id)
            return { ...updatedData, message: USERSOCIETYMAP.SUCCESS.USERMAP_UPDATED }
        } catch (error) {

            if (error instanceof HttpException) {
                throw error;
            }
            this.logger.error({
                error: error.message,
                stack: error.stack,
                payload: id, data,
            });
            throw new InternalServerErrorException(USERSOCIETYMAP.ERRORS.UPDATE_FAILED);
        }
    }

    async _removeSql(id: string) {
        try {
            await this._findOne(id)

            await this.sqlRepo!.update({ id }, { is_active: false })

            return { message: USERSOCIETYMAP.SUCCESS.USERMAP_DELETED };
        } catch (error) {
            if (error instanceof HttpException) {
                throw error;
            }

            // Unexpected / DB errors → log
            this.logger.error({
                error: error.message,
                stack: error.stack,
                payload: id,
            });

            throw new InternalServerErrorException(USERSOCIETYMAP.ERRORS.DELETE_FAILED);
        }
    }


}
