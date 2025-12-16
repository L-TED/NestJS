import { IsBoolean, IsEAN, IsEnum, IsString } from 'class-validator';

export class CreateGroundDto {
  @IsString({ message: '이름은 문자열만 가능합니다.' })
  name: string;

  @IsBoolean({ message: 'isAvailable은 불리언 값이어야 합니다.' })
  isAvailable: boolean;

  @IsString({ message: '주소는 문자열만 가능합니다.' })
  address: string;

  @IsEnum(['9 인용', '10 인용', '11 인용'], {
    message: '규모는 9 인용, 10 인용, 11 인용 중 하나여야 합니다.',
  })
  scale: '9 인용' | '10 인용' | '11 인용';
}
