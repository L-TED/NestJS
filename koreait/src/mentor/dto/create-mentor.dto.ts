import { IsString } from 'class-validator';

export class CreateMentorDto {
  @IsString({ message: '이름은 문자만 입력 가능합니다.' })
  name: string;
  @IsString({ message: '직급은 문자만 입력 가능합니다.' })
  position: string;
}
