import {
  Body,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tokens } from './entities/token.entity';
import { Repository } from 'typeorm';
import { Users } from '../users/entities/user.entity';
import { LoginDto } from './dto/login-dto';
import * as bcrypt from 'bcrypt';
import { TokenService } from './tokens.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Tokens) private tokenRepo: Repository<Tokens>,
    @InjectRepository(Users) private usersRepo: Repository<Users>,
    private tokenService: TokenService,
  ) {}

  async login(loginDto: LoginDto) {
    const { id, hashedPassword } = loginDto;
    const user = await this.usersRepo.findOne({ where: { id } });
    if (!user) throw new UnauthorizedException('존재하지 않는 아이디입니다.');

    const comparePW = await bcrypt.compare(hashedPassword, user.hashedPassword);
    if (!comparePW)
      throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');

    const access = this.tokenService.generateAccessToken(user.id);
    const refresh = await this.tokenService.generateRefreshToken(user.id);

    return { access, refresh };
  }

  async logout(userId: string) {
    const user = await this.tokenRepo.findOne({ where: { userId: userId } });
    if (!user) throw new UnauthorizedException('로그인 상태가 아닙니다.');
    const userID = user.userId;
    await this.tokenRepo.remove(user);
    return `ID: ${userID} 로그인이 완료되었습니다.`;
  }

  async validToken(token: string) {
    return this.tokenService.validateAccessToken(token);
  }
  async validRefreshToken(refreshToken: string) {
    return this.tokenService.validateRefreshToken(refreshToken);
  }
}
