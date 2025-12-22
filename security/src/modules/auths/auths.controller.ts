import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthsService } from './auths.service';
import { UserLoginDto } from './dto/login-user.dto';
import type { Request, Response } from 'express';

@Controller('auths')
export class AuthsController {
  constructor(private readonly authsService: AuthsService) {}

  @Post('login')
  async login(
    @Body() userLoginDto: UserLoginDto,
    @Res({ passthrough: true }) res,
  ) {
    const user = await this.authsService.login(userLoginDto);
    const accessToken = await this.authsService.generateAccessToken(user);
    const refreshToken = await this.authsService.generateRefreshToken(user);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'lax',
    });
    return accessToken;
  }

  @Post('refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { refreshToken } = req.cookies;

    if (!refreshToken)
      throw new UnauthorizedException('리프레쉬 토큰이 없습니다.');
    try {
      // 리프레쉬 토큰 검증 및 새 액세스 토큰 발급
      const newAccessToken =
        await this.authsService.refreshAccessToken(refreshToken);

      return { accessToken: newAccessToken };
    } catch (error) {
      throw new UnauthorizedException('유효하지 않은 리프레쉬 토큰입니다.');
    }
  }
}
