import { IsNumber, IsPositive } from 'class-validator';
import { Column, Entity } from 'typeorm';

@Entity()
export class CreateUsageDto {
  @IsNumber()
  @IsPositive()
  computerId: number;
  @IsNumber()
  @IsPositive()
  guestId: number;
}
