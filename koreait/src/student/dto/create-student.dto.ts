import {
  IsNumber,
  IsPhoneNumber,
  IsPositive,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';

export class CreateStudentDto {
  @IsString({ message: '이름은 문자만 입력 가능합니다.' })
  @MinLength(2, { message: '두 글자 이상 입력하십시오.' })
  name: string;
  @IsNumber({}, { message: '나이는 반드시 숫자여야 합니다.' })
  @IsPositive({ message: '양의 정수만 입력 가능합니다.' })
  @Min(20, { message: '최소 20세 이상이어야 합니다.' })
  age: number;
  @IsPhoneNumber('KR', { message: '전화번호 형식에 맞게 입력하십시오.' })
  phoneNumber: string;
}
