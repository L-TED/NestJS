import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { Tokens } from '../auth/entities/token.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Tokens])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
