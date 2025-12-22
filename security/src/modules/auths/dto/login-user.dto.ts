import { IsEmail, IsString, MinLength } from 'class-validator';

export class UserLoginDto {
  @IsEmail({}, { message: '이메일 형식이 아닙니다.' })
  email: string;
  @IsString()
  password: string;
}
