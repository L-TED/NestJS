import {
  IsArray,
  IsDate,
  IsEnum,
  IsNumber,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class CreateMemberDto {
  @IsString({ message: '이름은 문자열만 가능합니다.' })
  name: string;

  @IsNumber({}, { message: '나이는 숫자만 가능합니다.' })
  @IsPositive({ message: '나이는 양수만 가능합니다.' })
  @Min(25, { message: '나이는 최소 25세 이상이어야 합니다.' })
  age: number;

  @IsEnum(['골키퍼', '수비수', '미드필더', '공격수'], {
    each: true,
    message: '포지션은 골키퍼, 수비수, 미드필더, 공격수 중 하나여야 합니다.',
  })
  position: ('골키퍼' | '수비수' | '미드필더' | '공격수')[];
}
