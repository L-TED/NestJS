import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class SecretCodeGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const { headers } = context.switchToHttp().getRequest();
    const sc = headers['secret-code'];
    if (!sc) throw new UnauthorizedException('시크릿 코드가 필요합니다.');
    if (sc != 'A101')
      throw new UnauthorizedException('시크릿 코드가 불일치합니다.');

    return true;
  }
}
