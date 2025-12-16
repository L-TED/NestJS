import { Module } from '@nestjs/common';
import { ItAirService } from './it_air.service';
import { ItAirController } from './it_air.controller';

@Module({
  controllers: [ItAirController],
  providers: [ItAirService],
})
export class ItAirModule {}
