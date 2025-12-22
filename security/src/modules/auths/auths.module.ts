import { Module } from '@nestjs/common';
import { AuthsService } from './auths.service';
import { AuthsController } from './auths.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../users/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Refreshtokens } from './entity/refreshToken.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, Refreshtokens]),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('TOKEN_SECRET_KEY'),
        signOptions: {
          expiresIn: configService.get('TOKEN_EXPIRES_TIME'),
          issuer: configService.get('TOKEN_ISSUER'),
        },
      }),
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
  ],
  controllers: [AuthsController],
  providers: [AuthsService],
})
export class AuthsModule {}
