import { Module } from '@nestjs/common';
import { GuestsService } from './guests.service';
import { GuestsController } from './guests.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tiers } from 'src/tiers/entities/tier.entity';
import { Guests } from './entities/guest.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Guests, Tiers])],
  controllers: [GuestsController],
  providers: [GuestsService],
})
export class GuestsModule {}
