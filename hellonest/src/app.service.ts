import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello nest!';
  }
  getLunch(): string {
    return '돈까스 정식';
  }
}
