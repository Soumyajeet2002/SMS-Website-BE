import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';

import { isUUID } from 'class-validator';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';

import {
  ParkingSlotEntity,
  ParkingSlotStatus,
} from './entities/parking-slot-management.entities';

import { VehicleRegistrationEntity } from '../vehicle_registration/entities/vehicle_registration.entities';

import { CreateParkingSlotDto } from './dto/enter-parking-slot.dto';
import {} from './dto/update-parking-slot.dto';
import { GetParkingSlotsDto } from './dto/query-parking-slot.dto';

// @Injectable()
// export class ParkingSLotManagementService {
//   private readonly logger = new Logger(ParkingSLotManagementService.name);
// }

@Injectable()
export class ParkingSLotManagementService {
  private readonly logger = new Logger(ParkingSLotManagementService.name);

  constructor(
    @InjectRepository(ParkingSlotEntity)
    private readonly parkingRepo: Repository<ParkingSlotEntity>,

    @InjectRepository(VehicleRegistrationEntity)
    private readonly vehicleRepo: Repository<VehicleRegistrationEntity>,
  ) {}

  executeByActionType(fn: string, ...args: any[]) {
    const methodMap: Record<string, (...args: any[]) => Promise<unknown>> = {
      create: this._createParkingSlot.bind(this),
      getall: this._getAllParkingSlots.bind(this),
    };

    const method = methodMap[fn];

    if (!method) {
      throw new BadRequestException('Invalid action type');
    }

    return method(...args);
  }

  //   async _createParkingSlot(dto: CreateParkingSlotDto, userId: string) {
  //     try {
  //       // 🔍 Basic UUID validation (extra safety)
  //       if (!isUUID(dto.vehicleId) || !isUUID(dto.blockId)) {
  //         throw new BadRequestException('Invalid UUID provided');
  //       }

  //       // 🚫 Check if slot already occupied (same block + row + column)
  //       const existingSlot = await this.parkingRepo.findOne({
  //         where: {
  //           blockId: dto.blockId,
  //           rowNo: dto.rowNo,
  //           columnNo: dto.columnNo,
  //         },
  //       });

  //       if (existingSlot) {
  //         throw new ConflictException(
  //           'Parking slot already assigned for this position',
  //         );
  //       }

  //       // 🚫 Optional: prevent same vehicle from having multiple active slots
  //       const vehicleExists = await this.parkingRepo.findOne({
  //         where: {
  //           vehicleId: dto.vehicleId,
  //           status: ParkingSlotStatus.OCCUPIED,
  //         },
  //       });

  //       if (vehicleExists) {
  //         throw new ConflictException(
  //           'Vehicle already has an occupied parking slot',
  //         );
  //       }

  //       // ✅ Create entity
  //       const parkingSlot = this.parkingRepo.create({
  //         vehicleId: dto.vehicleId,
  //         blockId: dto.blockId,
  //         rowNo: dto.rowNo,
  //         columnNo: dto.columnNo,
  //         status: dto.status ?? ParkingSlotStatus.OCCUPIED,
  //         metaData: dto.metaData,
  //         createdBy: userId,
  //       });

  //       // 💾 Save
  //       const saved = await this.parkingRepo.save(parkingSlot);

  //       return {
  //         message: 'Parking slot assigned successfully',
  //         data: saved,
  //       };
  //     } catch (error) {
  //       this.logger.error('Error creating parking slot', error.stack);

  //       if (
  //         error instanceof BadRequestException ||
  //         error instanceof ConflictException
  //       ) {
  //         throw error;
  //       }

  //       throw new InternalServerErrorException('Failed to create parking slot');
  //     }
  //   }

  async _createParkingSlot(dto: CreateParkingSlotDto, userId: string) {
    try {
      const { blockId, slot } = dto;

      // 🔍 UUID validation
      if (!isUUID(slot.residentUuid) || !isUUID(blockId)) {
        throw new BadRequestException('Invalid UUID provided');
      }

      // 🚫 Check duplicate slot
      const existingSlot = await this.parkingRepo.findOne({
        where: {
          blockId,
          rowNo: slot.rowNo,
          columnNo: slot.columnNo,
        },
      });

      if (existingSlot) {
        throw new ConflictException(
          'Parking slot already assigned for this position',
        );
      }

      // 🚫 Vehicle already has slot
      const vehicleExists = await this.parkingRepo.findOne({
        where: {
          residentUuid: slot.residentUuid,
          status: ParkingSlotStatus.OCCUPIED,
        },
      });

      if (vehicleExists) {
        throw new ConflictException(
          'Vehicle already has an occupied parking slot',
        );
      }

      // ✅ Create entity
      const parkingSlot = this.parkingRepo.create({
        blockId,
        residentUuid: slot.residentUuid,
        rowNo: slot.rowNo,
        columnNo: slot.columnNo,
        status: slot.status ?? ParkingSlotStatus.OCCUPIED,
        metaData: slot.metaData,
        createdBy: userId,
      });

      const saved = await this.parkingRepo.save(parkingSlot);

      return {
        message: 'Parking slot assigned successfully',
        data: saved,
      };
    } catch (error) {
      this.logger.error('Error creating parking slot', error.stack);

      if (
        error instanceof BadRequestException ||
        error instanceof ConflictException
      ) {
        throw error;
      }

      throw new InternalServerErrorException('Failed to create parking slot');
    }
  }

  // GETALL
  //   async _getAllParkingSlots(dto: GetParkingSlotsDto) {
  //     try {
  //       const { vehicleId, blockId, rowNo, columnNo, page = 1, limit = 10 } = dto;

  //       const query = this.parkingRepo.createQueryBuilder('slot');

  //       // 🔍 Filters
  //       if (vehicleId) {
  //         query.andWhere('slot.vehicleId = :vehicleId', { vehicleId });
  //       }

  //       if (blockId) {
  //         query.andWhere('slot.blockId = :blockId', { blockId });
  //       }

  //       if (rowNo) {
  //         query.andWhere('slot.rowNo = :rowNo', { rowNo });
  //       }

  //       if (columnNo) {
  //         query.andWhere('slot.columnNo = :columnNo', { columnNo });
  //       }

  //       // 📄 Pagination
  //       const skip = (Number(page) - 1) * Number(limit);

  //       query.skip(skip).take(Number(limit)).orderBy('slot.createdAt', 'DESC');

  //       const [data, total] = await query.getManyAndCount();

  //       // ✅ GROUPING LOGIC
  //       //   const groupedData = data.reduce(
  //       //     (acc, item) => {
  //       //       if (!acc[item.blockId]) {
  //       //         acc[item.blockId] = [];
  //       //       }
  //       //       acc[item.blockId].push(item);
  //       //       return acc;
  //       //     },
  //       //     {} as Record<string, any[]>,
  //       //     );

  //       const groupedMap = data.reduce(
  //         (acc, item) => {
  //           if (!acc[item.blockId]) {
  //             acc[item.blockId] = [];
  //           }
  //           acc[item.blockId].push(item);
  //           return acc;
  //         },
  //         {} as Record<string, any[]>,
  //       );

  //       // 👉 convert to clean structure
  //       const groupedData = Object.keys(groupedMap).map((blockId) => ({
  //         blockId,
  //         slots: groupedMap[blockId],
  //       }));

  //       return {
  //         message: 'Parking slots fetched successfully',
  //         total,
  //         page: Number(page),
  //         limit: Number(limit),
  //         // data,
  //         data: groupedData,
  //       };
  //     } catch (error) {
  //       this.logger.error('Error fetching parking slots', error.stack);
  //       throw new InternalServerErrorException('Failed to fetch parking slots');
  //     }
  //   }

  async _getAllParkingSlots(dto: GetParkingSlotsDto) {
    try {
      const {
        residentUuid,
        blockId,
        rowNo,
        columnNo,
        page = 1,
        limit = 10,
      } = dto;

      const query = this.parkingRepo
        .createQueryBuilder('slot')

        // 🔗 JOIN with vehicle_registration
        .leftJoinAndSelect(
          'vehicle_registration',
          'vehicle',
          'vehicle.resident_id = slot.resident_uuid',
        );

      // 🔍 Filters
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

      // 📄 Pagination
      const skip = (Number(page) - 1) * Number(limit);

      query.skip(skip).take(Number(limit)).orderBy('slot.createdAt', 'DESC');

      // ✅ Get slots normally (no raw mess)
      const slots = await query.getMany();

      // 🧩 Collect all unique resident UUIDs
      const residentIds = [
        ...new Set(slots.map((s) => s.residentUuid).filter(Boolean)),
      ];

      // 🧩 Fetch all vehicles for those residents
      let vehicleMap: Record<string, any[]> = {};

      if (residentIds.length) {
        const vehicles = await this.vehicleRepo
          .createQueryBuilder('vehicle')
          .where('vehicle.resident_id IN (:...residentIds)', { residentIds })
          .getMany();

        // ✅ group vehicles by resident_id (type-safe)
        vehicleMap = vehicles.reduce(
          (acc: Record<string, any[]>, v: VehicleRegistrationEntity) => {
            if (!v.residentId) return acc; // safety check

            if (!acc[v.residentId]) {
              acc[v.residentId] = [];
            }

            acc[v.residentId].push({
              vehicleId: v.vehicleId,
              vehicleNumber: v.numberPlate, // ✅ your correct field
              vehicleType: v.vehicleType,
              vehicleModel: v.vehicleModel,
              vehiclePhoto: v.vehiclePhoto,
              fuelType: v.fuelType,
            });

            return acc;
          },
          {},
        );
      }

      // 🧩 Attach vehicles to slots (NULL SAFE)
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

      // ✅ GROUPING (unchanged)
      const groupedMap = data.reduce((acc: Record<string, any[]>, item) => {
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
    } catch (error) {
      this.logger.error('Error fetching parking slots', error.stack);
      throw new InternalServerErrorException('Failed to fetch parking slots');
    }
  }
}
