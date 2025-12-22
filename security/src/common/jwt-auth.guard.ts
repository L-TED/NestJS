import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const Authorization = req.headers['authorization'];
    if (!Authorization) throw new UnauthorizedException('토큰이 없습니다.');

    const [type, token] = Authorization.split(' ');
    if (type != 'Bearer')
      throw new UnauthorizedException('토큰이 유효하지 않습니다.');

    try {
      await this.jwtService.verifyAsync(token);
      return true;
    } catch (e) {
      throw new UnauthorizedException('토큰이 유효하지 않습니다.');
    }
  }
}
