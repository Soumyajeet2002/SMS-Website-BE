import { Controller, Post, Body, Req, Get, Query } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { SecurityGuardsService } from './security-guards.service';
import { CreateSecurityGuardsDto } from './dto/create-security-guards.dto';
import { GetSecurityGuardsDto } from './dto/query-security-guards.dto';

@Controller('security-guards')
export class SecurityGuardsController {
  constructor(private securityGuardsService: SecurityGuardsService) {}

  @ApiBearerAuth('access-token')
  @Post()
  async createGuards(
    @Req() req: Request,
    @Body() dto: CreateSecurityGuardsDto,
  ) {
    return this.securityGuardsService.executeByActionType('create', dto, req);
  }
  
  @ApiBearerAuth('access-token')
  @Get()
  async findAll(@Query() query: GetSecurityGuardsDto) {
    return this.securityGuardsService.executeByActionType('findAll', query);
  }
}
