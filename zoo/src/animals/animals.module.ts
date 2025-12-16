import { Module } from '@nestjs/common';
import { AnimalsService } from './animals.service';
import { AnimalsController } from './animals.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Animal } from './entities/animal.entity';
import { Zookeeper } from 'src/zookeepers/entities/zookeeper.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Animal, Zookeeper])],
  controllers: [AnimalsController],
  providers: [AnimalsService],
})
export class AnimalsModule {}
