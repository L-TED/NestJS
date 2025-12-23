import {
  BadRequestException,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { writeFileSync } from 'fs';
import { supabase } from 'supabase';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/uploads')
  @UseInterceptors(FileInterceptor('file'))
  async postUpload(@UploadedFile() file: Express.Multer.File) {
    const bucket = supabase.storage.from('photo');
    const tempFilePath = `temp/${crypto.randomUUID()}.jpg`;
    if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/jpg') {
      throw new BadRequestException('업로드 오류');
    }
    const { data, error } = await bucket.upload(tempFilePath, file.buffer, {
      contentType: 'image/jpg',
      upsert: false,
    });
    if (error) {
      throw new BadRequestException('업로드 실패');
    }
    console.log('업로드 성공');
    return {
      originalname: file.originalname,
      filename: file.filename,
      size: file.size,
      mimetype: file.mimetype,
      path: file.path,
    };
  }
}
