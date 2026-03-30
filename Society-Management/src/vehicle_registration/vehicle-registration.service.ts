// vehicle.service.ts

import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Repository } from 'typeorm';

import { isUUID } from 'class-validator';

import { CreateVehicleDto } from './dto/create-vehicle-registration.dto';

import { VehicleRegistrationEntity } from './entities/vehicle_registration.entities';

import { VehicleMapper } from './mapper/vehicle-registration.mapper';
import { GetVehicleQueryDto } from './dto/query-vehicle-registration.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { UpdateVehicleBulkDto } from './dto/update-vehicle.dto';
import { VehicleStatus } from './entities/vehicle_registration.entities';

import { ResidentDetailsService } from '../resident-details/resident-details.service';

@Injectable()
export class VehicleService {
  private readonly logger = new Logger(VehicleService.name);

  constructor(
    @InjectRepository(VehicleRegistrationEntity)
    private readonly vehicleRepo: Repository<VehicleRegistrationEntity>,
    private readonly dataSource: DataSource,
  ) {}

  executeByActionType(fn: string, ...args: any[]) {
    const methodMap: Record<string, (...args: any[]) => Promise<unknown>> = {
      create: this._createVehicle.bind(this),
      getByResident: this._getVehiclesByResident.bind(this),
      update: this._updateVehiclesByResident.bind(this),
    };

    const method = methodMap[fn];

    if (!method) {
      throw new BadRequestException('Invalid action type');
    }

    return method(...args);
  }

  /**
   * Create Vehicle (POST)
   */
  // async _createVehicle(data: CreateVehicleDto, userId?: string) {
  //   try {
  //     // ✅ Basic validation
  //     if (!data?.residentId || !isUUID(data.residentId)) {
  //       throw new BadRequestException('Valid residentId is required');
  //     }

  //     if (!data?.numberPlate) {
  //       throw new BadRequestException('numberPlate is required');
  //     }

  //     const normalizedPlate = data.numberPlate.toUpperCase();

  //     // ✅ Check duplicate number plate
  //     const existing = await this.vehicleRepo.findOne({
  //       where: { numberPlate: normalizedPlate },
  //     });

  //     if (existing) {
  //       throw new ConflictException(
  //         'Vehicle with this number plate already exists',
  //       );
  //     }

  //     // ✅ Map to entity
  //     const entity = VehicleMapper.toEntity(
  //       { ...data, numberPlate: normalizedPlate },
  //       userId,
  //     );

  //     // ✅ Save
  //     const saved = await this.vehicleRepo.save(entity);

  //     return {
  //       message: 'Vehicle created successfully',
  //       data: saved,
  //     };
  //   } catch (error) {
  //     this.logger.error('Error creating vehicle', error.stack);

  //     if (
  //       error instanceof BadRequestException ||
  //       error instanceof ConflictException
  //     ) {
  //       throw error;
  //     }

  //     throw new InternalServerErrorException('Failed to create vehicle');
  //   }
  // }

  async _createVehicle(data: any, userId?: string) {
    try {
      // ✅ Validate residentId
      if (!data?.residentId || !isUUID(data.residentId)) {
        throw new BadRequestException('Valid residentId is required');
      }

      // ✅ Validate vehicles array
      if (!data?.vehicles || !Array.isArray(data.vehicles)) {
        throw new BadRequestException('vehicles array is required');
      }

      const createdVehicles = [];

      for (const vehicle of data.vehicles) {
        // ✅ Validate number plate
        if (!vehicle?.numberPlate) {
          throw new BadRequestException('numberPlate is required');
        }

        const normalizedPlate = vehicle.numberPlate.toUpperCase();

        // ✅ Check duplicate
        const existing = await this.vehicleRepo.findOne({
          where: { numberPlate: normalizedPlate },
        });

        if (existing) {
          throw new ConflictException(
            `Vehicle with number plate ${normalizedPlate} already exists`,
          );
        }

        // ✅ Map to entity
        const entity = VehicleMapper.toEntity(
          {
            ...vehicle,
            numberPlate: normalizedPlate,
            residentId: data.residentId,
          },
          userId,
        );

        // ✅ Save
        const saved = await this.vehicleRepo.save(entity);

        createdVehicles.push(saved);
      }

      // ✅ Final response (grouped format)
      return {
        status: 201,
        message: 'Vehicles created successfully',
        data: {
          residentId: data.residentId,
          vehicles: createdVehicles,
        },
      };
    } catch (error) {
      this.logger.error('Error creating vehicle', error.stack);

      if (
        error instanceof BadRequestException ||
        error instanceof ConflictException
      ) {
        throw error;
      }

      throw new InternalServerErrorException('Failed to create vehicle');
    }
  }
  // GET
  // async _getVehiclesByResident(query: GetVehicleQueryDto) {
  //   try {
  //     const {
  //       residentId,
  //       search,
  //       vehicleType,
  //       fuelType,
  //       status,
  //       page = 1,
  //       limit = 10,
  //       sortBy = 'createdAt',
  //       sortOrder = 'DESC',
  //     } = query;

  //     const qb = this.vehicleRepo.createQueryBuilder('vehicle');

  //     // 🔹 Filters
  //     if (residentId) {
  //       qb.andWhere('vehicle.resident_id = :residentId', { residentId });
  //     }

  //     if (vehicleType) {
  //       qb.andWhere('vehicle.vehicle_type ILIKE :vehicleType', {
  //         vehicleType: `%${vehicleType}%`,
  //       });
  //     }

  //     if (fuelType !== undefined) {
  //       qb.andWhere('vehicle.fuel_type = :fuelType', { fuelType });
  //     }

  //     if (status !== undefined) {
  //       qb.andWhere('vehicle.status = :status', { status });
  //     }

  //     // 🔹 Search
  //     if (search) {
  //       qb.andWhere(
  //         `(vehicle.number_plate ILIKE :search
  //       OR vehicle.vehicle_type ILIKE :search
  //       OR vehicle.vehicle_model ILIKE :search)`,
  //         { search: `%${search}%` },
  //       );
  //     }

  //     // 🔹 Sorting
  //     qb.orderBy(`vehicle.${sortBy}`, sortOrder as 'ASC' | 'DESC');

  //     // 🔹 Pagination
  //     qb.skip((page - 1) * limit).take(limit);

  //     const [records, total] = await qb.getManyAndCount();

  //     const grouped = records.reduce((acc: any, curr) => {
  //       if (!acc[curr.residentId]) {
  //         acc[curr.residentId] = [];
  //       }
  //       acc[curr.residentId].push(curr);
  //       return acc;
  //     }, {});

  //     const response = Object.keys(grouped).map((resId) => ({
  //       residentId: resId,
  //       vehicles: grouped[resId].map((entity: VehicleRegistrationEntity) => ({
  //         vehicleId: entity.vehicleId,
  //         vehicleType: entity.vehicleType,
  //         numberPlate: entity.numberPlate,
  //         vehicleModel: entity.vehicleModel ?? null,
  //         vehiclePhoto: entity.vehiclePhoto ?? null,
  //         fuelType: entity.fuelType ?? null,
  //         status: entity.status,
  //         metaData: entity.metaData ?? null,
  //         createdAt: entity.createdAt,
  //         updatedAt: entity.updatedAt ?? null,
  //       })),
  //     }));

  //     return {
  //       message: 'Vehicles fetched successfully',
  //       data: response,
  //     };
  //   } catch (error) {
  //     this.logger.error('Error fetching vehicles', error.stack);
  //     throw new InternalServerErrorException('Failed to fetch vehicles');
  //   }
  // }

  async _getVehiclesByResident(query: GetVehicleQueryDto) {
    try {
      const {
        residentId,
        search,
        vehicleType,
        fuelType,
        status,
        page = 1,
        limit = 10,
      } = query;

      const offset = (page - 1) * limit;

      let conditions: string[] = [];
      let values: any[] = [];
      let index = 1;

      // 🔹 Filters
      if (residentId) {
        conditions.push(`v.resident_id = $${index}`);
        values.push(residentId);
        index++;
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

      // 🔹 Main Query
      const result = await this.dataSource.query(
        `
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
      `,
        [...values, limit, offset],
      );

      // 🔹 Count Query
      const countResult = await this.dataSource.query(
        `
      SELECT COUNT(*) AS total
      FROM society_management.vehicle_registration v

      LEFT JOIN society_management.resident_details rd
        ON rd.resident_uuid = v.resident_id

      LEFT JOIN society_management.user_society_map rsm
        ON rsm.user_id = rd.resident_uuid

      LEFT JOIN identity.users u
        ON u.id = rsm.user_id

      ${whereClause}
      `,
        values,
      );

      const total = Number(countResult[0]?.total || 0);

      // 🔹 Grouping
      let recordCounter = 1;
      const grouped = result.reduce((acc: any, curr: any) => {
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
        data: Object.values(grouped),
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      };
    } catch (error) {
      this.logger.error('Error fetching vehicles', error.stack);
      throw new InternalServerErrorException('Failed to fetch vehicles');
    }
  }

  // async _getVehiclesByResident(query: GetVehicleQueryDto) {
  //   try {
  //     const {
  //       residentId,
  //       search,
  //       vehicleType,
  //       fuelType,
  //       status,
  //       page = 1,
  //       limit = 10,
  //       sortBy = 'createdAt',
  //       sortOrder = 'DESC',
  //     } = query;

  //     const qb = this.vehicleRepo
  //       .createQueryBuilder('vehicle')
  //       .leftJoin(
  //         '"society_management"."resident_details"',
  //         'rd',
  //         'rd.resident_uuid = vehicle.resident_id',
  //       )
  //       .leftJoin(
  //         '"society_management"."user_society_map"',
  //         'rsm',
  //         'rsm.user_id = rd.resident_uuid',
  //       )
  //       .leftJoin('"identity"."users"', 'u', 'u.id = rsm.user_id')
  //       .select([
  //         'vehicle.vehicle_id AS "vehicleId"',
  //         'vehicle.resident_id AS "residentId"',
  //         'vehicle.vehicle_type AS "vehicleType"',
  //         'vehicle.number_plate AS "numberPlate"',
  //         'vehicle.vehicle_model AS "vehicleModel"',
  //         'vehicle.vehicle_photo AS "vehiclePhoto"',
  //         'vehicle.fuel_type AS "fuelType"',
  //         'vehicle.status AS "status"',
  //         'vehicle.meta_data AS "metaData"',
  //         'vehicle.created_at AS "createdAt"',
  //         'vehicle.updated_at AS "updatedAt"',
  //         'u.name AS "residentName"', // ✅ THIS IS WHAT YOU NEED
  //       ]);

  //     // 🔹 Filters
  //     if (residentId) {
  //       qb.andWhere('vehicle.resident_id = :residentId', { residentId });
  //     }

  //     if (vehicleType) {
  //       qb.andWhere('vehicle.vehicle_type ILIKE :vehicleType', {
  //         vehicleType: `%${vehicleType}%`,
  //       });
  //     }

  //     if (fuelType !== undefined) {
  //       qb.andWhere('vehicle.fuel_type = :fuelType', { fuelType });
  //     }

  //     if (status !== undefined) {
  //       qb.andWhere('vehicle.status = :status', { status });
  //     }

  //     if (search) {
  //       qb.andWhere(
  //         `(vehicle.number_plate ILIKE :search
  //       OR vehicle.vehicle_type ILIKE :search
  //       OR vehicle.vehicle_model ILIKE :search)`,
  //         { search: `%${search}%` },
  //       );
  //     }

  //     // 🔹 Sorting
  //     qb.orderBy(`vehicle.${sortBy}`, sortOrder as 'ASC' | 'DESC');

  //     // 🔹 Pagination
  //     qb.skip((page - 1) * limit).take(limit);

  //     // ✅ IMPORTANT CHANGE
  //     const records = await qb.getRawMany();

  //     // 🔹 Count (separate)
  //     const total = await this.vehicleRepo
  //       .createQueryBuilder('vehicle')
  //       .getCount();

  //     // 🔹 Grouping with residentName
  //     const grouped = records.reduce((acc: any, curr: any) => {
  //       if (!acc[curr.residentId]) {
  //         acc[curr.residentId] = {
  //           residentId: curr.residentId,
  //           residentName: curr.residentName || null,
  //           vehicles: [],
  //         };
  //       }

  //       acc[curr.residentId].vehicles.push({
  //         vehicleId: curr.vehicleId,
  //         vehicleType: curr.vehicleType,
  //         numberPlate: curr.numberPlate,
  //         vehicleModel: curr.vehicleModel ?? null,
  //         vehiclePhoto: curr.vehiclePhoto ?? null,
  //         fuelType: curr.fuelType ?? null,
  //         status: curr.status,
  //         metaData: curr.metaData ?? null,
  //         createdAt: curr.createdAt,
  //         updatedAt: curr.updatedAt ?? null,
  //       });

  //       return acc;
  //     }, {});

  //     return {
  //       message: 'Vehicles fetched successfully',
  //       data: Object.values(grouped),
  //       total,
  //       page,
  //       limit,
  //       totalPages: Math.ceil(total / limit),
  //     };
  //   } catch (error) {
  //     this.logger.error('Error fetching vehicles', error.stack);
  //     throw new InternalServerErrorException('Failed to fetch vehicles');
  //   }
  // }
  // UPDATE
  async _updateVehiclesByResident(
    residentId: string,
    dto: UpdateVehicleBulkDto,
    userId?: string,
  ) {
    try {
      // ✅ Validate residentId
      if (!residentId || !isUUID(residentId)) {
        throw new BadRequestException('Valid residentId is required');
      }

      const { vehicles } = dto;

      if (!vehicles || !Array.isArray(vehicles) || vehicles.length === 0) {
        throw new BadRequestException('vehicles array is required');
      }

      const updatedVehicles = [];

      for (const vehicle of vehicles) {
        const { vehicleId } = vehicle;

        // ✅ Validate vehicleId
        if (!vehicleId) {
          throw new BadRequestException('vehicleId is required');
        }

        const existing = await this.vehicleRepo.findOne({
          where: { vehicleId, residentId },
        });

        if (!existing) {
          throw new NotFoundException(
            `Vehicle ${vehicleId} not found for this resident`,
          );
        }

        // ✅ Handle number plate update
        if (vehicle.numberPlate) {
          const normalizedPlate = vehicle.numberPlate.toUpperCase();

          const duplicate = await this.vehicleRepo.findOne({
            where: { numberPlate: normalizedPlate },
          });

          if (duplicate && duplicate.vehicleId !== vehicleId) {
            throw new ConflictException(
              `Vehicle with number plate ${normalizedPlate} already exists`,
            );
          }

          existing.numberPlate = normalizedPlate;
        }

        // ✅ Clean partial update (dynamic)
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

        // ✅ Audit
        if (userId) {
          (existing as any).updatedBy = userId;
        }

        updatedVehicles.push(existing);
      }

      // ✅ Save all at once (better performance)
      const savedVehicles = await this.vehicleRepo.save(updatedVehicles);

      return {
        status: 200,
        message: 'Vehicles updated successfully',
        data: {
          residentId,
          vehicles: savedVehicles,
        },
      };
    } catch (error) {
      this.logger.error('Error updating vehicles', error.stack);

      if (
        error instanceof BadRequestException ||
        error instanceof ConflictException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }

      throw new InternalServerErrorException('Failed to update vehicles');
    }
  }

  async deleteVehicle(vehicleId: string) {
    const vehicle = await this.vehicleRepo.findOne({
      where: { vehicleId },
    });

    if (!vehicle) {
      throw new NotFoundException('Vehicle not found');
    }

    // Prevent double delete (optional but clean)
    if (vehicle.status === VehicleStatus.DELETED) {
      return { message: 'Vehicle already deleted' };
    }

    vehicle.status = VehicleStatus.DELETED;

    await this.vehicleRepo.save(vehicle);

    return {
      message: 'Vehicle deleted successfully',
    };
  }
}
