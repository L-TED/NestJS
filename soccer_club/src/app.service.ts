import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '조기축구회에 어서오세요!';
  }
}
