import { IsDateString, IsString, Length } from 'class-validator';
import { Column, Entity } from 'typeorm';

@Entity()
export class CreateStaffDto {
  @IsString()
  @Length(2, 255)
  name: string;
  @IsDateString()
  hireYear: string;
}
