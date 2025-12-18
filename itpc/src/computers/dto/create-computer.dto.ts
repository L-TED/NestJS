import { IsEnum, IsNumber, IsPositive, IsString } from 'class-validator';
import { Column, Entity } from 'typeorm';

enum newStatus {
  '양호',
  '고장',
  '수리중',
}

@Entity()
export class CreateComputerDto {
  @IsString()
  spec: string;
  @IsNumber()
  @IsPositive()
  price: number;
  @IsEnum(newStatus, {
    message: '양호, 고장, 수리중 중에서만 고를 수 있습니다.',
  })
  status: '양호' | '고장' | '수리중';
}
