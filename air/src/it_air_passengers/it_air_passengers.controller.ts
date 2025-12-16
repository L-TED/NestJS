import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ItAirPassengersService } from './it_air_passengers.service';
import { CreateItAirPassengerDto } from './dto/create-it_air_passenger.dto';
import { UpdateItAirPassengerDto } from './dto/update-it_air_passenger.dto';

@Controller('it-air/passengers')
export class ItAirPassengersController {
  constructor(
    private readonly itAirPassengersService: ItAirPassengersService,
  ) {}

  @Post('')
  create(@Body() createItAirPassengerDto: CreateItAirPassengerDto) {
    return this.itAirPassengersService.create(createItAirPassengerDto);
  }

  @Get('')
  findAll() {
    return this.itAirPassengersService.findAll();
  }

  @Get('/:passport')
  findOne(@Param('passport') passport: string) {
    return this.itAirPassengersService.findOne(passport);
  }

  @Patch('/:passport')
  update(
    @Param('passport') passport: string,
    @Body() updateItAirPassengerDto: UpdateItAirPassengerDto,
  ) {
    return this.itAirPassengersService.update(
      passport,
      updateItAirPassengerDto,
    );
  }

  @Delete('/:passport')
  remove(@Param('passport') passport: string) {
    return this.itAirPassengersService.remove(passport);
  }
}
