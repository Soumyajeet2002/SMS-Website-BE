import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ParseUUIDPipe,
  Req,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';

import { VendorDetailsService } from './vendor-details.service';
import { CreateVendorDetailsDto } from './dto/create-vendor-details.dto';
import type { Request } from 'express';

import { GetVendorQueryDto } from './dto/fetch-vendor-details.dto';

@ApiTags('Vendors')
@ApiBearerAuth('access-token')
@Controller('vendor_details')
export class VendorDetailsController {
  constructor(private readonly vendorDetailsService: VendorDetailsService) {}

  /* ---------- CREATE ---------- */
  @Post()
  @ApiOperation({ summary: 'Create Vendor' })
  create(@Body() dto: CreateVendorDetailsDto, @Req() req: Request) {
    return this.vendorDetailsService.executeByActionType('create', dto, req);
  }

  @Get()
  @ApiOperation({ summary: 'GET_ALL_VENDORS' })
  async getAllVendors(@Query() query: GetVendorQueryDto) {
    return this.vendorDetailsService.executeByActionType('fetch', query);
  }
}
