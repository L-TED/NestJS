import { PartialType } from '@nestjs/mapped-types';
import { CreateItAirPassengerDto } from './create-it_air_passenger.dto';

export class UpdateItAirPassengerDto extends PartialType(
  CreateItAirPassengerDto,
) {
  newPassengerName: string;
  newMembershipStatus?: 'Gold' | 'Silver' | 'Bronze' | 'None';
}
