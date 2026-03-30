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
  Delete,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
  ApiResponse,
} from '@nestjs/swagger';

import { VendorDetailsService } from './vendor-details.service';
import { CreateVendorDetailsDto } from './dto/create-vendor-details.dto';
import type { Request } from 'express';

import { GetVendorQueryDto } from './dto/fetch-vendor-details.dto';
import { UpdateVendorDto } from './dto/update-vendor-details.dto';

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

  @Patch(':vendorId')
  @ApiOperation({ summary: 'Update a vendor by ID' })
  async updateVendor(
    @Param('vendorId') vendorId: string,
    @Body() data: UpdateVendorDto,
  ) {
    return this.vendorDetailsService.executeByActionType(
      'update',
      vendorId,
      data,
    );
  }

  @Delete(':vendorId')
  @ApiOperation({ summary: 'Delete vendor by ID' })
  @ApiResponse({ status: 200, description: 'Vendor deleted successfully' })
  @ApiResponse({ status: 409, description: 'Vendor not found' })
  async deleteVendor(@Param('vendorId') vendorId: string) {
    return this.vendorDetailsService.executeByActionType('delete', vendorId);
  }
}
