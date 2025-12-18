import { Module } from '@nestjs/common';
import { TiersService } from './tiers.service';
import { TiersController } from './tiers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tiers } from './entities/tier.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tiers])],
  controllers: [TiersController],
  providers: [TiersService],
})
export class TiersModule {}
