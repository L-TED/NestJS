import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-dto';
import type { Response, Request } from 'express';
import { AuthGuard as AuthGuard } from 'src/common/auth-guard.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { access, refresh } = await this.authService.login(loginDto);
    res.cookie('refreshToken', refresh, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 10 * 60 * 1000,
    });

    return { access };
  }

  @Post('/validToken')
  validToken(@Body() dto: { token: string }) {
    return this.authService.validToken(dto.token);
  }
  @Post('/refresh')
  validRefreshToken(@Req() req: Request) {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken)
      throw new UnauthorizedException('리프레쉬 토큰이 존재하지 않습니다.');

    return this.authService.validRefreshToken(refreshToken);
  }

  @Post('/logout')
  logout(@Body('userId') userId: string) {
    return this.authService.logout(userId);
  }

  @Get('/test')
  @UseGuards(AuthGuard)
  bakery() {
    return console.log('아롬베이크');
  }
}
