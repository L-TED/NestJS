import { Module } from '@nestjs/common';
import { ZookeepersService } from './zookeepers.service';
import { ZookeepersController } from './zookeepers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Zookeeper } from './entities/zookeeper.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Zookeeper])],
  controllers: [ZookeepersController],
  providers: [ZookeepersService],
})
export class ZookeepersModule {}
