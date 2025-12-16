import { Module } from '@nestjs/common';
import { ItAirPassengersService } from './it_air_passengers.service';
import { ItAirPassengersController } from './it_air_passengers.controller';

@Module({
  controllers: [ItAirPassengersController],
  providers: [ItAirPassengersService],
})
export class ItAirPassengersModule {}
