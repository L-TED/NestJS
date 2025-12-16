import { IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateCoffeeDto {
  @IsString()
  name: string;
  @IsNumber({}, { message: '숫자만 입력 가능합니다.' })
  @IsPositive({ message: '양의 정수만 입력 가능합니다.' })
  price: number;
  @IsNumber({}, { message: '숫자만 입력 가능합니다.' })
  @IsPositive({ message: '양의 정수만 입력 가능합니다.' })
  shots: number;
}
