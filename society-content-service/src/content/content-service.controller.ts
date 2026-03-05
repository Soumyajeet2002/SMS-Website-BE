import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
// import { Query } from '@nestjs/common';

import { ContentService } from './content-service.service';
import { CreateContentDto } from './dto/create-content.dto';
// import { QueryContentDto } from './dto/query-contents.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth('access-token')
@Controller('contents')
export class ContentController {
  constructor(private readonly contentService: ContentService) {}

  /* ============================================================
     CREATE
  ============================================================ */
  //   @ApiBearerAuth('access-token')
  @Post()
  async create(@Body() dto: CreateContentDto, @Req() req: any) {
    console.log('Received create content request with DTO:');
    return this.contentService.create(dto, req);
  }

  /* ============================================================
     GET ALL (Pagination + Search)
  ============================================================ */
  //   @Get()
  //   async findAll(@Query() query: QueryContentDto) {
  //     return this.contentService.findAll(query);
  //   }
  //   @ApiBearerAuth('access-token')
  @Get()
  async findAll() {
    return this.contentService.findAll();
  }

  /* ============================================================
     GET BY ID
  ============================================================ */
  //   @ApiBearerAuth('access-token')
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.contentService.findOne(id);
  }
}
