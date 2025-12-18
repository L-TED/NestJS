import { Module } from '@nestjs/common';
import { UsagesService } from './usages.service';
import { UsagesController } from './usages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Guests } from 'src/guests/entities/guest.entity';
import { Computers } from 'src/computers/entities/computer.entity';
import { Usages } from './entities/usage.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usages, Guests, Computers])],
  controllers: [UsagesController],
  providers: [UsagesService],
})
export class UsagesModule {}
