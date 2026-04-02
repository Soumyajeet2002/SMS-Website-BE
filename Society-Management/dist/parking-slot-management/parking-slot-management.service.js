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
var ParkingSLotManagementService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParkingSLotManagementService = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const parking_slot_management_entities_1 = require("./entities/parking-slot-management.entities");
const vehicle_registration_entities_1 = require("../vehicle_registration/entities/vehicle_registration.entities");
let ParkingSLotManagementService = ParkingSLotManagementService_1 = class ParkingSLotManagementService {
    parkingRepo;
    vehicleRepo;
    logger = new common_1.Logger(ParkingSLotManagementService_1.name);
    constructor(parkingRepo, vehicleRepo) {
        this.parkingRepo = parkingRepo;
        this.vehicleRepo = vehicleRepo;
    }
    executeByActionType(fn, ...args) {
        const methodMap = {
            create: this._createParkingSlot.bind(this),
            getall: this._getAllParkingSlots.bind(this),
        };
        const method = methodMap[fn];
        if (!method) {
            throw new common_1.BadRequestException('Invalid action type');
        }
        return method(...args);
    }
    async _createParkingSlot(dto, userId) {
        try {
            const { blockId, slot } = dto;
            if (!(0, class_validator_1.isUUID)(slot.residentUuid) || !(0, class_validator_1.isUUID)(blockId)) {
                throw new common_1.BadRequestException('Invalid UUID provided');
            }
            const existingSlot = await this.parkingRepo.findOne({
                where: {
                    blockId,
                    rowNo: slot.rowNo,
                    columnNo: slot.columnNo,
                },
            });
            if (existingSlot) {
                throw new common_1.ConflictException('Parking slot already assigned for this position');
            }
            const vehicleExists = await this.parkingRepo.findOne({
                where: {
                    residentUuid: slot.residentUuid,
                    status: parking_slot_management_entities_1.ParkingSlotStatus.OCCUPIED,
                },
            });
            if (vehicleExists) {
                throw new common_1.ConflictException('Vehicle already has an occupied parking slot');
            }
            const parkingSlot = this.parkingRepo.create({
                blockId,
                residentUuid: slot.residentUuid,
                rowNo: slot.rowNo,
                columnNo: slot.columnNo,
                status: slot.status ?? parking_slot_management_entities_1.ParkingSlotStatus.OCCUPIED,
                metaData: slot.metaData,
                createdBy: userId,
            });
            const saved = await this.parkingRepo.save(parkingSlot);
            return {
                message: 'Parking slot assigned successfully',
                data: saved,
            };
        }
        catch (error) {
            this.logger.error('Error creating parking slot', error.stack);
            if (error instanceof common_1.BadRequestException ||
                error instanceof common_1.ConflictException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException('Failed to create parking slot');
        }
    }
    async _getAllParkingSlots(dto) {
        try {
            const { residentUuid, blockId, rowNo, columnNo, page = 1, limit = 10, } = dto;
            const query = this.parkingRepo
                .createQueryBuilder('slot')
                .leftJoinAndSelect('vehicle_registration', 'vehicle', 'vehicle.resident_id = slot.resident_uuid');
            if (residentUuid) {
                query.andWhere('slot.residentUuid = :residentUuid', { residentUuid });
            }
            if (blockId) {
                query.andWhere('slot.blockId = :blockId', { blockId });
            }
            if (rowNo) {
                query.andWhere('slot.rowNo = :rowNo', { rowNo });
            }
            if (columnNo) {
                query.andWhere('slot.columnNo = :columnNo', { columnNo });
            }
            const skip = (Number(page) - 1) * Number(limit);
            query.skip(skip).take(Number(limit)).orderBy('slot.createdAt', 'DESC');
            const slots = await query.getMany();
            const residentIds = [
                ...new Set(slots.map((s) => s.residentUuid).filter(Boolean)),
            ];
            let vehicleMap = {};
            if (residentIds.length) {
                const vehicles = await this.vehicleRepo
                    .createQueryBuilder('vehicle')
                    .where('vehicle.resident_id IN (:...residentIds)', { residentIds })
                    .getMany();
                vehicleMap = vehicles.reduce((acc, v) => {
                    if (!v.residentId)
                        return acc;
                    if (!acc[v.residentId]) {
                        acc[v.residentId] = [];
                    }
                    acc[v.residentId].push({
                        vehicleId: v.vehicleId,
                        vehicleNumber: v.numberPlate,
                        vehicleType: v.vehicleType,
                        vehicleModel: v.vehicleModel,
                        vehiclePhoto: v.vehiclePhoto,
                        fuelType: v.fuelType,
                    });
                    return acc;
                }, {});
            }
            const data = slots.map((slot) => {
                if (!slot.residentUuid) {
                    return {
                        ...slot,
                        vehicles: [],
                    };
                }
                return {
                    ...slot,
                    vehicles: vehicleMap[slot.residentUuid] || [],
                };
            });
            const groupedMap = data.reduce((acc, item) => {
                if (!acc[item.blockId]) {
                    acc[item.blockId] = [];
                }
                acc[item.blockId].push(item);
                return acc;
            }, {});
            const groupedData = Object.keys(groupedMap).map((blockId) => ({
                blockId,
                slots: groupedMap[blockId],
            }));
            return {
                message: 'Parking slots fetched successfully',
                total: data.length,
                page: Number(page),
                limit: Number(limit),
                data: groupedData,
            };
        }
        catch (error) {
            this.logger.error('Error fetching parking slots', error.stack);
            throw new common_1.InternalServerErrorException('Failed to fetch parking slots');
        }
    }
};
exports.ParkingSLotManagementService = ParkingSLotManagementService;
exports.ParkingSLotManagementService = ParkingSLotManagementService = ParkingSLotManagementService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(parking_slot_management_entities_1.ParkingSlotEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(vehicle_registration_entities_1.VehicleRegistrationEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ParkingSLotManagementService);
//# sourceMappingURL=parking-slot-management.service.js.map