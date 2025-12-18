import {
  IsDate,
  IsDateString,
  IsNumber,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStaffDto {
  @ApiProperty({ description: '직원 이름', example: '홍길동', minLength: 2 })
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty({ description: '직원 나이', example: 25, minimum: 1 })
  @IsNumber()
  @IsPositive()
  age: number;

  @ApiProperty({ description: '입사년도', example: '2024-01-01' })
  @IsDateString()
  year: string;
}
