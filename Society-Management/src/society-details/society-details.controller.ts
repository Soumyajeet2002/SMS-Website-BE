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

import { SocietyDetailsService } from './society-details.service';
import { CreateSocietySetupDetailsDto } from './dto/create-society-details.dto';
import { UpdateSocietyDetailsDto } from './dto/update-society-details.dto';
import { QuerySocietyDto } from './dto/query-society-details.dto';
import type { Request } from 'express';
import { UserRole } from 'src/common/constants/common.constant';
import { Roles } from 'src/common/decorators/role.decorator';

@ApiTags('Societies')
@ApiBearerAuth('access-token')
@Controller('societies')
export class SocietyDetailsController {
  constructor(
    private readonly societyDetailsService: SocietyDetailsService,
  ) { }

  /* ---------- CREATE ---------- */
  @Post()
  create(@Body() dto: CreateSocietySetupDetailsDto, @Req() req: Request) {
    return this.societyDetailsService.executeByDBType('create', dto, req);
  }

  /* ---------- GET BY ID ---------- */
  @Get(':id')
  // @ApiParam({
  //   name: 'id',
  //   description: 'Society UUID',
  //   example: '550e8400-e29b-41d4-a716-446655440000',
  // })
  getById(@Param('id', ParseUUIDPipe) id: string) {
    return this.societyDetailsService.executeByDBType('getById', id);
  }

  /* ---------- GET ALL (PAGINATED) ---------- */
  @Roles(UserRole.SUPER_ADMIN,UserRole.SOCIETY_ADMIN)
  @Get()
  getAll(@Req() req: Request, @Query() query: QuerySocietyDto) {
    return this.societyDetailsService.executeByDBType('getAll', query);
  }

  /* ---------- UPDATE ---------- */
  @Patch(':id')
  // @ApiParam({
  //   name: 'id',
  //   description: 'Society UUID',
  //   example: '550e8400-e29b-41d4-a716-446655440000',
  // })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateSocietyDetailsDto, @Req() req: Request) {
    return this.societyDetailsService.executeByDBType('update', id, dto, req);
  }
}
