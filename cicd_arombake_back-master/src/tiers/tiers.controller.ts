import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { TiersService } from './tiers.service';
import { CreateTierDto } from './dto/create-tier.dto';
import { UpdateTierDto } from './dto/update-tier.dto';

@ApiTags('tiers')
@Controller('tiers')
export class TiersController {
  constructor(private readonly tiersService: TiersService) {}

  @Post()
  @ApiOperation({ summary: '등급 생성' })
  @ApiResponse({ status: 201, description: '등급이 성공적으로 생성되었습니다.' })
  create(@Body() createTierDto: CreateTierDto) {
    return this.tiersService.create(createTierDto);
  }

  @Get()
  @ApiOperation({ summary: '모든 등급 조회' })
  @ApiResponse({ status: 200, description: '등급 목록을 반환합니다.' })
  findAll() {
    return this.tiersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '등급 조회' })
  @ApiParam({ name: 'id', description: '등급 ID' })
  @ApiResponse({ status: 200, description: '등급 정보를 반환합니다.' })
  findOne(@Param('id') id: string) {
    return this.tiersService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: '등급 수정' })
  @ApiParam({ name: 'id', description: '등급 ID' })
  @ApiResponse({ status: 200, description: '등급이 성공적으로 수정되었습니다.' })
  update(@Param('id') id: string, @Body() updateTierDto: UpdateTierDto) {
    return this.tiersService.update(+id, updateTierDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '등급 삭제' })
  @ApiParam({ name: 'id', description: '등급 ID' })
  @ApiResponse({ status: 200, description: '등급이 성공적으로 삭제되었습니다.' })
  remove(@Param('id') id: string) {
    return this.tiersService.remove(+id);
  }
}
