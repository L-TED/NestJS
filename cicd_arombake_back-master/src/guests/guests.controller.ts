import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { GuestsService } from './guests.service';
import { CreateGuestDto } from './dto/create-guest.dto';
import { UpdateGuestDto } from './dto/update-guest.dto';

@ApiTags('guests')
@Controller('guests')
export class GuestsController {
  constructor(private readonly guestsService: GuestsService) {}

  @Post()
  @ApiOperation({ summary: '고객 생성' })
  @ApiResponse({
    status: 201,
    description: '고객이 성공적으로 생성되었습니다.',
  })
  create(@Body() createGuestDto: CreateGuestDto) {
    return this.guestsService.create(createGuestDto);
  }

  @Get()
  @ApiOperation({ summary: '모든 고객 조회' })
  @ApiResponse({ status: 200, description: '고객 목록을 반환합니다.' })
  findAll() {
    return this.guestsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '고객 조회' })
  @ApiParam({ name: 'id', description: '고객 ID' })
  @ApiResponse({ status: 200, description: '고객 정보를 반환합니다.' })
  findOne(@Param('id') id: string) {
    return this.guestsService.findOne(+id);
  }

  @Delete(':id')
  @ApiOperation({ summary: '고객 삭제' })
  @ApiParam({ name: 'id', description: '고객 ID' })
  @ApiResponse({
    status: 200,
    description: '고객이 성공적으로 삭제되었습니다.',
  })
  remove(@Param('id') id: string) {
    return this.guestsService.remove(+id);
  }
}
