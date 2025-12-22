import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { Refreshtokens } from './entity/refreshToken.entity';

@Injectable()
export class AuthsService {
  constructor(
    @InjectRepository(Users) private userRepo: Repository<Users>,
    @InjectRepository(Refreshtokens)
    private refreshRepo: Repository<Refreshtokens>,
    private jwtService: JwtService,
  ) {}

  async login(userLoginDto: UserLoginDto) {
    const user = await this.validateUser(userLoginDto);
    return user;
  }

  async validateUser(userLoginDto: UserLoginDto) {
    const { email, password } = userLoginDto;
    const getUser = await this.userRepo.findOne({
      where: { email: email },
    });
    if (!getUser) throw new UnauthorizedException('이메일을 확인하십시오.');
    const correctPassword = await bcrypt.compare(password, getUser.password);
    if (!correctPassword)
      throw new UnauthorizedException('패스워드를 확인하십시오.');
    return getUser;
  }

  async generateAccessToken(user: Users) {
    return this.jwtService.sign({ email: user.email, tag: 'armory' });
  }

  async generateRefreshToken(user: Users) {
    const refreshToken = await this.jwtService.sign(
      {
        userId: user.id,
        email: user.email,
      },
      {
        expiresIn: '1h',
      },
    );

    const hashToken = await bcrypt.hash(refreshToken, 10);

    const newRefreshToken = await this.refreshRepo.create({
      user: user,
      token: hashToken,
      userId: user.id,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60),
    });
    await this.refreshRepo.save(newRefreshToken);
    return refreshToken;
  }
  async refreshAccessToken(refreshToken: string) {
    // 1. JWT 토큰 검증 및 페이로드 추출
    let payload;
    try {
      payload = this.jwtService.verify(refreshToken);
    } catch (error) {
      throw new UnauthorizedException('만료되거나 유효하지 않은 토큰입니다.');
    }

    // 2. DB에서 해시된 리프레쉬 토큰 찾기
    const userId = payload.userId;
    const storedTokens = await this.refreshRepo.find({
      where: { userId },
      relations: ['user'],
    });

    if (!storedTokens || storedTokens.length === 0) {
      throw new UnauthorizedException('리프레쉬 토큰을 찾을 수 없습니다.');
    }

    // 3. 제공된 토큰과 저장된 해시 비교
    let validToken: Refreshtokens | null = null;
    for (const stored of storedTokens) {
      const isMatch = await bcrypt.compare(refreshToken, stored.token);
      if (isMatch) {
        validToken = stored;
        break;
      }
    }

    if (!validToken) {
      throw new UnauthorizedException('유효하지 않은 리프레쉬 토큰입니다.');
    }

    // 4. 만료 시간 확인
    if (validToken.expiresAt < new Date()) {
      await this.refreshRepo.remove(validToken);
      throw new UnauthorizedException('리프레쉬 토큰이 만료되었습니다.');
    }

    // 5. 새 액세스 토큰 생성
    const user = validToken.user;
    const newAccessToken = await this.generateAccessToken(user);

    return newAccessToken;
  }
}
