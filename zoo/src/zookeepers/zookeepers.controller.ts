import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ZookeepersService } from './zookeepers.service';
import { CreateZookeeperDto } from './dto/create-zookeeper.dto';
import { UpdateZookeeperDto } from './dto/update-zookeeper.dto';

@Controller('zookeepers')
export class ZookeepersController {
  constructor(private readonly zookeepersService: ZookeepersService) {}

  @Post()
  create(@Body() createZookeeperDto: CreateZookeeperDto) {
    return this.zookeepersService.create(createZookeeperDto);
  }

  @Get()
  findAll() {
    return this.zookeepersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zookeepersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateZookeeperDto: UpdateZookeeperDto) {
    return this.zookeepersService.update(+id, updateZookeeperDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.zookeepersService.remove(+id);
  }
}
