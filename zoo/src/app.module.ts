import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AnimalsModule } from './animals/animals.module';
import { ZookeepersModule } from './zookeepers/zookeepers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AreasModule } from './areas/areas.module';
import { FoodtrucksModule } from './foodtrucks/foodtrucks.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'abc000',
      database: 'zoo',
      entities: [__dirname + '/**/*.entity.{ts,js}'],
    }),
    AnimalsModule,
    ZookeepersModule,
    AreasModule,
    FoodtrucksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
