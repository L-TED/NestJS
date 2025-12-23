import { Body, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tokens } from './entities/token.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Users } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Tokens) private tokenRepo: Repository<Tokens>,
    @InjectRepository(Users) private usersRepo: Repository<Users>,
    private jwtService: JwtService,
  ) {}

  generateAccessToken(userId: string) {
    return this.jwtService.sign({ sub: userId }, { expiresIn: '3m' });
  }

  validateAccessToken(token: string) {
    return this.jwtService.verify(token);
  }

  async generateRefreshToken(userId: string) {
    const refreshToken = this.jwtService.sign(
      { sub: userId },
      { expiresIn: '10m' },
    );
    const target = await this.tokenRepo.findOne({ where: { userId } });
    if (target?.userId == userId) await this.tokenRepo.remove(target);
    const hashedToken = await bcrypt.hash(refreshToken, 10);
    const newToken = await this.tokenRepo.create({
      hashedToken,
      userId,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    });
    await this.tokenRepo.save(newToken);
    return refreshToken;
  }
  async validateRefreshToken(token: string) {
    try {
      await this.jwtService.verify(token);
      const payload = this.jwtService.decode(token);
      const getToken = await this.tokenRepo.findOne({
        where: { userId: payload.sub },
      });
      if (!getToken)
        throw new UnauthorizedException('리프레쉬 토큰이 존재하지 않습니다.');
      const isSame = await bcrypt.compare(token, getToken?.hashedToken ?? '');
      if (!isSame)
        throw new UnauthorizedException('리프레쉬 토큰이 유효하지 않습니다.');
      if (getToken.isRevoked)
        throw new UnauthorizedException('리프레쉬 토큰이 유효하지 않습니다.');
      if (getToken.expiresAt < new Date())
        throw new UnauthorizedException('리프레쉬 토큰이 유효하지 않습니다.');
      return await this.generateAccessToken(payload.sub);
    } catch (e) {
      throw new UnauthorizedException('리프레쉬 토큰이 유효하지 않습니다.');
    }
  }
}
