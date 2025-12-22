import { IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  id: string;
  @IsString()
  @MinLength(3, { message: '닉네임은 최소 3 글자 이상 입력해야 합니다.' })
  nickname: string;
  @IsString()
  hashedPassword: string;
}
