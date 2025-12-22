import { IsEmail, IsString } from 'class-validator';
import { Entity } from 'typeorm';

@Entity()
export class CreateUserDto {
  @IsEmail()
  email: string;
  @IsString({ message: '문자를 입력하십시오.' })
  password: string;
}
