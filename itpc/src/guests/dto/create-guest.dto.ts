import { IsNumber, IsPositive, IsString, Length } from 'class-validator';
import { Column, Entity } from 'typeorm';

@Entity()
export class CreateGuestDto {
  @IsString()
  @Length(2, 255)
  name: string;
  @IsNumber()
  @IsPositive()
  age: number;
  @IsString()
  password: string;
}
