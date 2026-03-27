import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ConflictException } from '@nestjs/common';
import { randomUUID } from 'crypto';

import { Logger } from '@nestjs/common';
import {
  VendorDetailsEntity,
  VendorStatus,
} from './entities/vendor-details.entities';

import { CreateVendorDetailsDto } from './dto/create-vendor-details.dto';
import { GetVendorQueryDto } from './dto/fetch-vendor-details.dto';

@Injectable()
export class VendorDetailsService {
  private readonly logger = new Logger(VendorDetailsService.name);
  constructor(
    @InjectRepository(VendorDetailsEntity)
    private readonly vendorRepo: Repository<VendorDetailsEntity>,
  ) {}

  // 🔁 Action handler
  executeByActionType(fn: string, ...args: any[]) {
    const methodMap: Record<string, Function> = {
      create: this._createSql.bind(this),
      fetch: this._getAllVendors.bind(this),
    };

    if (!methodMap[fn]) {
      throw new Error(`Invalid action type: ${fn}`);
    }

    return methodMap[fn](...args);
  }

  async _createSql(data: CreateVendorDetailsDto, req: any) {
    try {
      // ✅ Required fields check
      if (!data.vendorName || !data.vendorType) {
        throw new Error('vendorName and vendorType are required');
      }

      // 🔍 Check for duplicate email or phone number
      const conditions = [];
      if (data.email) conditions.push({ email: data.email });
      if (data.phoneNo) conditions.push({ phoneNo: data.phoneNo });

      if (conditions.length) {
        const existingVendor = await this.vendorRepo.findOne({
          where: conditions,
        });

        if (existingVendor) {
          throw new ConflictException(
            'Vendor with this email or phone number already exists',
          );
        }
      }

      // 🧱 Create entity
      const entity = this.vendorRepo.create({
        ...data,
        vendorStatus: data.vendorStatus ?? VendorStatus.ACTIVE,
        created_by: req.user.userId,
        updated_by: req.user.userId,
      });

      const saved = await this.vendorRepo.save(entity);

      return {
        message: 'Vendor created successfully',
        data: saved,
      };
    } catch (error) {
      // ✅ Log error with NestJS Logger
      this.logger.error(
        `Error creating vendor. Payload: ${JSON.stringify(data)}`,
        error.stack,
        'VendorDetailsService',
      );

      // 🔁 Re-throw known conflict, otherwise generic error
      if (error instanceof ConflictException) throw error;
      throw new Error('Failed to create vendor');
    }
  }

  async _getAllVendors(query: GetVendorQueryDto) {
    try {
      const page = Math.max(query.page || 1, 1);
      const limit = query.limit || 10;

      const qb = this.vendorRepo.createQueryBuilder('vendor');

      // 🔍 Optional search by vendorName or vendorType
      if (query.search) {
        qb.andWhere(
          '(vendor.vendor_name ILIKE :search OR vendor.vendor_type ILIKE :search)',
          { search: `%${query.search}%` },
        );
      }

      //   // ✅ Optional filter by vendorStatus
      //   if (query.vendorStatus !== undefined) {
      //     qb.andWhere('vendor.vendor_status = :status', {
      //       status: query.vendorStatus,
      //     });
      //   }

      // ⚡ Safe sorting
      const allowedSort = [
        'created_at',
        'vendor_name',
        'vendor_type',
        'vendor_status',
      ];
      const sortBy = allowedSort.includes(query.sortBy ?? '')
        ? query.sortBy!
        : 'created_at';
      const sortOrder = query.sortOrder === 'ASC' ? 'ASC' : 'DESC';
      qb.orderBy(`vendor.${sortBy}`, sortOrder);

      // 🔄 Pagination
      qb.skip((page - 1) * limit).take(limit);

      // 🧩 Execute query
      const [vendors, total] = await qb.getManyAndCount();

      return {
        message: 'Vendors fetched successfully',
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        data: vendors,
      };
    } catch (error) {
      this.logger.error('Fetch Vendors Failed', error.stack || error);
      throw new InternalServerErrorException('Failed to fetch vendors');
    }
  }
}
