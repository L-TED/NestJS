import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ComputersModule } from './computers/computers.module';
import { GuestsModule } from './guests/guests.module';
import { StaffsModule } from './staffs/staffs.module';
import { UsagesModule } from './usages/usages.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ComputersModule,
    GuestsModule,
    StaffsModule,
    UsagesModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'abc000',
      database: 'itpc',
      autoLoadEntities: true,
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
