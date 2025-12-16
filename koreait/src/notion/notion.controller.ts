import { Controller, Post, Body, Get } from '@nestjs/common';
import { NotionService } from './notion.service';
import { CreateNotionDto } from './dto/create-notion.dto';

@Controller('notion')
export class NotionController {
  constructor(private readonly notionService: NotionService) {}

  @Post()
  create(@Body() createNotionDto: CreateNotionDto) {
    return this.notionService.create(createNotionDto);
  }

  @Post('/kakao')
  createKakaoDb() {
    return this.notionService.createKakaoDailyDb();
  }

  @Post('/add')
  async add() {
    return await this.notionService.addData();
  }

  @Get('/kakao')
  kakaoLog() {
    return this.notionService.kakaoLog();
  }
}
