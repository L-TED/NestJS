import { IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateClassroomDto {
  @IsString({ message: '강의실 이름은 문자만 입력 가능합니다.' })
  roomName: string;

  @IsNumber({}, { message: '최대 정원은 반드시 숫자여야 합니다.' })
  @IsPositive({ message: '양의 정수만 입력 가능합니다.' })
  capacity: number;
}
