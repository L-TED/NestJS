import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Entity } from 'typeorm';

@Entity()
export class CreateGunDto {
  @IsString()
  @MinLength(2, { message: '최소 두 글자 이상 작성해야 합니다.' })
  @IsNotEmpty({ message: '문자를 입력하십시오.' })
  name: string;
}
