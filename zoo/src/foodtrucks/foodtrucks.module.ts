import { Module } from '@nestjs/common';
import { FoodtrucksService } from './foodtrucks.service';
import { FoodtrucksController } from './foodtrucks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Foodtrucks } from './entities/foodtruck.entity';
import { Areas } from 'src/areas/entities/area.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Foodtrucks, Areas])],
  controllers: [FoodtrucksController],
  providers: [FoodtrucksService],
})
export class FoodtrucksModule {}
