import { IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateAreaDto {
  @IsString({ message: '문자만 입력 가능' })
  name: string;
  @IsNumber({}, { message: '양의 정수만 입력 가능' })
  @IsPositive({ message: '양의 정수만 입력 가능' })
  size: number;
}
