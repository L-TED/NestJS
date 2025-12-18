import { IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateFoodtruckDto {
  @IsString({ message: '문자만 입력 가능' })
  name: string;
  @IsString({ message: '문자만 입력 가능' })
  owner: string;
  @IsString({ message: '문자만 입력 가능' })
  main: string; // main menu
  @IsString({ message: '문자만 입력 가능' })
  subs: string; // sub menu
  @IsNumber({}, { message: '양의 정수만 입력 가능' })
  @IsPositive({ message: '양의 정수만 입력 가능' })
  area_id: number;
}
