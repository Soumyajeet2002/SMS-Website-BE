"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var VehicleService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const typeorm_3 = require("typeorm");
const class_validator_1 = require("class-validator");
const vehicle_registration_entities_1 = require("./entities/vehicle_registration.entities");
const vehicle_registration_mapper_1 = require("./mapper/vehicle-registration.mapper");
const vehicle_registration_entities_2 = require("./entities/vehicle_registration.entities");
let VehicleService = VehicleService_1 = class VehicleService {
    vehicleRepo;
    dataSource;
    logger = new common_1.Logger(VehicleService_1.name);
    constructor(vehicleRepo, dataSource) {
        this.vehicleRepo = vehicleRepo;
        this.dataSource = dataSource;
    }
    executeByActionType(fn, ...args) {
        const methodMap = {
            create: this._createVehicle.bind(this),
            getByResident: this._getVehiclesByResident.bind(this),
            update: this._updateVehiclesByResident.bind(this),
        };
        const method = methodMap[fn];
        if (!method) {
            throw new common_1.BadRequestException('Invalid action type');
        }
        return method(...args);
    }
    async _createVehicle(data, userId) {
        try {
            if (!data?.residentId || !(0, class_validator_1.isUUID)(data.residentId)) {
                throw new common_1.BadRequestException('Valid residentId is required');
            }
            if (!data?.vehicles || !Array.isArray(data.vehicles)) {
                throw new common_1.BadRequestException('vehicles array is required');
            }
            const createdVehicles = [];
            for (const vehicle of data.vehicles) {
                if (!vehicle?.numberPlate) {
                    throw new common_1.BadRequestException('numberPlate is required');
                }
                const normalizedPlate = vehicle.numberPlate.toUpperCase();
                const existing = await this.vehicleRepo.findOne({
                    where: { numberPlate: normalizedPlate },
                });
                if (existing) {
                    throw new common_1.ConflictException(`Vehicle with number plate ${normalizedPlate} already exists`);
                }
                const entity = vehicle_registration_mapper_1.VehicleMapper.toEntity({
                    ...vehicle,
                    numberPlate: normalizedPlate,
                    residentId: data.residentId,
                }, userId);
                const saved = await this.vehicleRepo.save(entity);
                createdVehicles.push(saved);
            }
            return {
                status: 201,
                message: 'Vehicles created successfully',
                data: {
                    residentId: data.residentId,
                    vehicles: createdVehicles,
                },
            };
        }
        catch (error) {
            this.logger.error('Error creating vehicle', error.stack);
            if (error instanceof common_1.BadRequestException ||
                error instanceof common_1.ConflictException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('Failed to create vehicle');
        }
    }
    async _getVehiclesByResident(query) {
        try {
            const { residentId, search, vehicleType, fuelType, status, page = 1, limit = 10, } = query;
            const offset = (page - 1) * limit;
            let conditions = [];
            let values = [];
            let index = 1;
            if (residentId) {
                if ((0, class_validator_1.isUUID)(residentId)) {
                    conditions.push(`v.resident_id = $${index}`);
                    values.push(residentId);
                    index++;
                }
                else {
                    conditions.push(`u.name ILIKE $${index}`);
                    values.push(`%${residentId}%`);
                    index++;
                }
            }
            if (vehicleType) {
                conditions.push(`v.vehicle_type ILIKE $${index}`);
                values.push(`%${vehicleType}%`);
                index++;
            }
            if (fuelType !== undefined) {
                conditions.push(`v.fuel_type = $${index}`);
                values.push(fuelType);
                index++;
            }
            if (status !== undefined) {
                conditions.push(`v.status = $${index}`);
                values.push(status);
                index++;
            }
            if (search) {
                conditions.push(`(
        v.number_plate ILIKE $${index}
        OR v.vehicle_type ILIKE $${index}
        OR v.vehicle_model ILIKE $${index}
      )`);
                values.push(`%${search}%`);
                index++;
            }
            const whereClause = conditions.length
                ? `WHERE ${conditions.join(' AND ')}`
                : '';
            const result = await this.dataSource.query(`
      SELECT 
        v.vehicle_id,
        v.resident_id,
        v.vehicle_type,
        v.number_plate,
        v.vehicle_model,
        v.vehicle_photo,
        v.fuel_type,
        v.status,
        v.meta_data,
        v.created_at,
        v.updated_at,
        u.name AS resident_name

      FROM society_management.vehicle_registration v

      LEFT JOIN society_management.resident_details rd
        ON rd.resident_uuid = v.resident_id

      LEFT JOIN society_management.user_society_map rsm
        ON rsm.user_id = rd.resident_uuid

      LEFT JOIN identity.users u
        ON u.id = rsm.user_id

      ${whereClause}
      ORDER BY v.created_at DESC
      LIMIT $${index} OFFSET $${index + 1}
      `, [...values, limit, offset]);
            const countResult = await this.dataSource.query(`
      SELECT COUNT(*) AS total
      FROM society_management.vehicle_registration v

      LEFT JOIN society_management.resident_details rd
        ON rd.resident_uuid = v.resident_id

      LEFT JOIN society_management.user_society_map rsm
        ON rsm.user_id = rd.resident_uuid

      LEFT JOIN identity.users u
        ON u.id = rsm.user_id

      ${whereClause}
      `, values);
            const total = Number(countResult[0]?.total || 0);
            let recordCounter = 1;
            const grouped = result.reduce((acc, curr) => {
                if (!acc[curr.resident_id]) {
                    acc[curr.resident_id] = {
                        recordId: `rec${recordCounter++}`,
                        residentId: curr.resident_id,
                        residentName: curr.resident_name || null,
                        createdAt: curr.created_at
                            ? new Date(curr.created_at).toISOString().split('T')[0]
                            : null,
                        vehicleCount: 0,
                        vehicles: [],
                    };
                }
                acc[curr.resident_id].vehicles.push({
                    vehicleId: curr.vehicle_id,
                    vehicleType: curr.vehicle_type,
                    numberPlate: curr.number_plate,
                    vehicleModel: curr.vehicle_model ?? null,
                    vehiclePhoto: curr.vehicle_photo ?? null,
                    fuelType: curr.fuel_type ?? null,
                    status: curr.status,
                    metaData: curr.meta_data ?? null,
                    createdAt: curr.created_at,
                    updatedAt: curr.updated_at ?? null,
                });
                acc[curr.resident_id].vehicleCount++;
                return acc;
            }, {});
            return {
                message: 'Vehicles fetched successfully',
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
                data: Object.values(grouped),
            };
        }
        catch (error) {
            this.logger.error('Error fetching vehicles', error.stack);
            throw new common_1.InternalServerErrorException('Failed to fetch vehicles');
        }
    }
    async _updateVehiclesByResident(residentId, dto, userId) {
        try {
            if (!residentId || !(0, class_validator_1.isUUID)(residentId)) {
                throw new common_1.BadRequestException('Valid residentId is required');
            }
            const { vehicles } = dto;
            if (!vehicles || !Array.isArray(vehicles) || vehicles.length === 0) {
                throw new common_1.BadRequestException('vehicles array is required');
            }
            const updatedVehicles = [];
            for (const vehicle of vehicles) {
                let existing = null;
                if (vehicle.vehicleId) {
                    existing = await this.vehicleRepo.findOne({
                        where: { vehicleId: vehicle.vehicleId, residentId },
                    });
                }
                if (!existing) {
                    if (!vehicle.numberPlate) {
                        throw new common_1.BadRequestException('numberPlate is required for new vehicle');
                    }
                    const normalizedPlate = vehicle.numberPlate.toUpperCase();
                    const duplicate = await this.vehicleRepo.findOne({
                        where: { numberPlate: normalizedPlate },
                    });
                    if (duplicate) {
                        throw new common_1.ConflictException(`Vehicle with number plate ${normalizedPlate} already exists`);
                    }
                    const newVehicle = this.vehicleRepo.create({
                        residentId,
                        numberPlate: normalizedPlate,
                        vehicleType: vehicle.vehicleType,
                        vehicleModel: vehicle.vehicleModel,
                        vehiclePhoto: vehicle.vehiclePhoto,
                        fuelType: vehicle.fuelType,
                        status: vehicle.status,
                        metaData: vehicle.metaData,
                        ...(userId && { createdBy: userId }),
                    });
                    updatedVehicles.push(newVehicle);
                    continue;
                }
                if (vehicle.numberPlate) {
                    const normalizedPlate = vehicle.numberPlate.toUpperCase();
                    const duplicate = await this.vehicleRepo.findOne({
                        where: { numberPlate: normalizedPlate },
                    });
                    if (duplicate && duplicate.vehicleId !== existing.vehicleId) {
                        throw new common_1.ConflictException(`Vehicle with number plate ${normalizedPlate} already exists`);
                    }
                    existing.numberPlate = normalizedPlate;
                }
                Object.assign(existing, {
                    ...(vehicle.vehicleType !== undefined && {
                        vehicleType: vehicle.vehicleType,
                    }),
                    ...(vehicle.vehicleModel !== undefined && {
                        vehicleModel: vehicle.vehicleModel,
                    }),
                    ...(vehicle.vehiclePhoto !== undefined && {
                        vehiclePhoto: vehicle.vehiclePhoto,
                    }),
                    ...(vehicle.fuelType !== undefined && {
                        fuelType: vehicle.fuelType,
                    }),
                    ...(vehicle.status !== undefined && {
                        status: vehicle.status,
                    }),
                    ...(vehicle.metaData !== undefined && {
                        metaData: vehicle.metaData,
                    }),
                });
                if (userId) {
                    existing.updatedBy = userId;
                }
                updatedVehicles.push(existing);
            }
            const savedVehicles = await this.vehicleRepo.save(updatedVehicles);
            return {
                status: 200,
                message: 'Vehicles updated successfully',
                data: {
                    residentId,
                    vehicles: savedVehicles,
                },
            };
        }
        catch (error) {
            this.logger.error('Error updating vehicles', error.stack);
            if (error instanceof common_1.BadRequestException ||
                error instanceof common_1.ConflictException ||
                error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('Failed to update vehicles');
        }
    }
    async deleteVehicle(vehicleId) {
        const vehicle = await this.vehicleRepo.findOne({
            where: { vehicleId },
        });
        if (!vehicle) {
            throw new common_1.NotFoundException('Vehicle not found');
        }
        if (vehicle.status === vehicle_registration_entities_2.VehicleStatus.DELETED) {
            return { message: 'Vehicle already deleted' };
        }
        vehicle.status = vehicle_registration_entities_2.VehicleStatus.DELETED;
        await this.vehicleRepo.save(vehicle);
        return {
            message: 'Vehicle deleted successfully',
        };
    }
};
exports.VehicleService = VehicleService;
exports.VehicleService = VehicleService = VehicleService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(vehicle_registration_entities_1.VehicleRegistrationEntity)),
    __metadata("design:paramtypes", [typeorm_3.Repository,
        typeorm_2.DataSource])
], VehicleService);
//# sourceMappingURL=vehicle-registration.service.js.map