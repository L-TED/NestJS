import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CafeService } from './cafe.service';
import { CreateCafeDto } from './dto/create-cafe.dto';
import { UpdateCafeDto } from './dto/update-cafe.dto';

@Controller('cafe')
export class CafeController {
  constructor(private readonly cafeService: CafeService) {}
  // 메뉴
  @Post('menu')
  createMenu(@Body() createCafeDto: CreateCafeDto) {
    return this.cafeService.createMenu(createCafeDto);
  }

  @Get('menus')
  findAllMenu() {
    return this.cafeService.findAllMenu();
  }

  @Get('menus/:id')
  findOneMenu(@Param('id') id: string) {
    return this.cafeService.findOneMenu(+id);
  }

  @Patch('menus/:id')
  updateMenu(@Param('id') id: string, @Body() updateCafeDto: UpdateCafeDto) {
    return this.cafeService.updateMenu(+id, updateCafeDto);
  }

  @Delete('menus/:id')
  removeMenu(@Param('id') id: string) {
    return this.cafeService.removeMenu(+id);
  }

  // 스태프
  @Post('staff')
  createStaff(@Body() createCafeDto: CreateCafeDto) {
    return this.cafeService.createStaff(createCafeDto);
  }

  @Get('staffs')
  findAllStaff() {
    return this.cafeService.findAllStaff();
  }

  @Get('staffs/:id')
  findOneStaff(@Param('id') id: string) {
    return this.cafeService.findOneStaff(+id);
  }

  @Patch('staffs/:id')
  updateStaff(@Param('id') id: string, @Body() updateCafeDto: UpdateCafeDto) {
    return this.cafeService.updateStaff(+id, updateCafeDto);
  }

  @Delete('staffs/:id')
  removeStaff(@Param('id') id: string) {
    return this.cafeService.removeStaff(+id);
  }
}
