import { Module } from '@nestjs/common';
import { GunsService } from './guns.service';
import { GunsController } from './guns.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Guns } from './entities/gun.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService, ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Guns]),
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
  controllers: [GunsController],
  providers: [GunsService],
})
export class GunsModule {}
