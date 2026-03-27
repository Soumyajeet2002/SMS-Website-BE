import { Injectable, Logger, InternalServerErrorException } from '@nestjs/common';
import { ResidentDetails } from './entities/resident-details.entities';
import { CreateResidentMapDto } from './dto/create-resident-details.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { USERRESIDENTMAP } from 'src/common/messages/specific.msg';
import { residentDetailsReqMapper } from "./mapper/resident-details.request.mapper"
@Injectable()
export class ResidentDetailsService {
    private readonly logger = new Logger(ResidentDetailsService.name);
    constructor(
        @InjectRepository(ResidentDetails)
        private readonly sqlRepo?: Repository<ResidentDetails>
    ) { }

    executeByActionType(fn: string, ...args: any[]) {
        const methodMap: Record<string, Function> = {
            create: this._createSql.bind(this)
        };

        const method = methodMap[fn];
        if (!method) throw new Error(`Invalid function: ${fn}`);
        return method(...args);
    }

    async _createSql(data: CreateResidentMapDto, req: any) {
        const mappedEntity = residentDetailsReqMapper(data);
        try {
            const entity = this.sqlRepo!.create({ ...mappedEntity, created_by: req.user.userId });
            await this.sqlRepo!.save(entity);
            return { message: USERRESIDENTMAP.SUCCESS.RESIDENT_CREATED }
        } catch (error) {
            this.logger.error({
                error: error.message,
                stack: error.stack,
                payload: data,
            });
            throw new InternalServerErrorException(USERRESIDENTMAP.ERRORS.CREATE_FAILED);
        }
    }
}
