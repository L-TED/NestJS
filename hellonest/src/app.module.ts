import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './student/student.module';
import { TeacherModule } from './teacher/teacher.module';
import { CafeModule } from './cafe/cafe.module';

@Module({
  imports: [StudentModule, TeacherModule, CafeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
