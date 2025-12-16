import { IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateAnimalDto {
  @IsString({ message: '문자만 입력 가능' })
  name: string;
  @IsString({ message: '문자만 입력 가능' })
  systematics: string;
  @IsNumber({}, { message: '양의 정수만 입력 가능' })
  @IsPositive({ message: '양의 정수만 입력 가능' })
  count: number;
  @IsNumber({}, { message: '양의 정수만 입력 가능' })
  @IsPositive({ message: '양의 정수만 입력 가능' })
  zookeeperId: number;
}
