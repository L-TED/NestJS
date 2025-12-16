import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ItAirService } from './it_air.service';
import { CreateItAirDto } from './dto/create-it_air.dto';
import { UpdateItAirDto } from './dto/update-it_air.dto';

@Controller('it-air/flights')
export class ItAirController {
  constructor(private readonly itAirService: ItAirService) {}

  @Post('')
  create(@Body() createItAirDto: CreateItAirDto) {
    return this.itAirService.create(createItAirDto);
  }

  @Get('')
  findAll() {
    return this.itAirService.findAll();
  }

  @Get('/:name')
  findOne(@Param('name') name: string) {
    return this.itAirService.findOne(name);
  }

  @Patch('/:name')
  update(@Param('name') name: string, @Body() updateItAirDto: UpdateItAirDto) {
    return this.itAirService.update(name, updateItAirDto);
  }

  @Delete('/:name')
  remove(@Param('name') name: string) {
    return this.itAirService.remove(name);
  }
}
