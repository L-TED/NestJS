import { PartialType } from '@nestjs/mapped-types';
import { CreateItAirDto } from './create-it_air.dto';
import { hour, minute } from '../entities/it_air.entity';

export class UpdateItAirDto extends PartialType(CreateItAirDto) {
  newFlightName: string;
  newFlightSchedule?: {
    origin: string;
    destination: string;
    departureDate: Date;
    departureTime: `${hour}:${minute}`;
  };
}
