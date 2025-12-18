import { IsNumber, IsPositive, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGuestDto {
  @ApiProperty({ description: '고객 이름', example: '김철수' })
  @IsString()
  name: string;

  @ApiProperty({ description: '지출 금액', example: 50000, minimum: 1 })
  @IsNumber()
  @IsPositive()
  expenditure: number;

  @ApiProperty({ description: '등급 ID', example: 1, minimum: 1 })
  @IsNumber()
  @IsPositive()
  tierId: number;
}
