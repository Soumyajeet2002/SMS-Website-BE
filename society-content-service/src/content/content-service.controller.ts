import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Query,
  // Put,
  Patch,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { ContentService } from './content-service.service';
import { CreateContentDto } from './dto/create-content.dto';
import { QueryContentDto } from './dto/query-contents.dto';
import { UpdateContentDto } from './dto/update-content.dto';

@Controller('contents')
export class ContentController {
  constructor(private contentService: ContentService) {}

  /** Create Content */
  @ApiBearerAuth('access-token')
  // @UseGuards(JwtAuthGuard)
  @Post()
  async createContent(@Body() data: CreateContentDto, @Req() req: any) {
    return this.contentService.executeByActionType('create', data, req);
  }

  /** Get all contents */
  @ApiBearerAuth('access-token')
  // @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Query() query: QueryContentDto) {
    return this.contentService.executeByActionType('findAll', query);
  }

  /** Get one content by id */
  @ApiBearerAuth('access-token')
  // @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getContent(@Param('id') id: string) {
    return this.contentService.executeByActionType('findOne', id);
  }

  @ApiBearerAuth('access-token')
  @Patch(':id')
  async updateContent(@Param('id') id: string, @Body() dto: UpdateContentDto) {
    return this.contentService.executeByActionType('update', id, dto);
  }

  /** Delete content by id */
  @ApiBearerAuth('access-token')
  @Delete(':id')
  deleteContent(@Param('id') id: string) {
    return this.contentService.executeByActionType('remove', id);
  }
}
