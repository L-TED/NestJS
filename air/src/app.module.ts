import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItAirModule } from './it_air/it_air.module';
import { ItAirPassengersModule } from './it_air_passengers/it_air_passengers.module';

@Module({
  imports: [ItAirModule, ItAirPassengersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
