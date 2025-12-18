import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { StaffsService } from './staffs.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { RabbitGuard } from 'src/common/rabbit.guard';

@ApiTags('staffs')
@Controller('staffs')
export class StaffsController {
  constructor(private readonly staffsService: StaffsService) {}

  @Post()
  @ApiOperation({ summary: '직원 생성' })
  @ApiResponse({
    status: 201,
    description: '직원이 성공적으로 생성되었습니다.',
  })
  create(@Body() createStaffDto: CreateStaffDto) {
    return this.staffsService.create(createStaffDto);
  }

  @Get()
  @UseGuards(RabbitGuard)
  @ApiOperation({ summary: '모든 직원 조회' })
  @ApiResponse({ status: 200, description: '직원 목록을 반환합니다.' })
  findAll() {
    return this.staffsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '직원 조회' })
  @ApiParam({ name: 'id', description: '직원 ID' })
  @ApiResponse({ status: 200, description: '직원 정보를 반환합니다.' })
  findOne(@Param('id') id: string) {
    return this.staffsService.findOne(+id);
  }

  @Delete(':id')
  @ApiOperation({ summary: '직원 삭제' })
  @ApiParam({ name: 'id', description: '직원 ID' })
  @ApiResponse({
    status: 200,
    description: '직원이 성공적으로 삭제되었습니다.',
  })
  remove(@Param('id') id: string) {
    return this.staffsService.remove(+id);
  }
}
