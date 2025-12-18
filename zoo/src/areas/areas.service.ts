import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Areas } from './entities/area.entity';

@Injectable()
export class AreasService {
  constructor(
    @InjectRepository(Areas) private areaRepository: Repository<Areas>,
  ) {}

  async create(createAreaDto: CreateAreaDto) {
    const newArea = await this.areaRepository.create(createAreaDto);
    await this.areaRepository.save(newArea);
    return `${newArea.name} 생성 완료`;
  }

  async findAll() {
    const areas = await this.areaRepository.find();
    return areas;
  }

  async findOne(id: number) {
    const area = await this.areaRepository.findOne({ where: { id: id } });
    if (!area) throw new NotFoundException('존재하지 않는 지역입니다.');
    return area;
  }

  update(id: number, updateAreaDto: UpdateAreaDto) {
    return `This action updates a #${id} area`;
  }

  async remove(id: number) {
    const target = await this.areaRepository.findOne({
      where: { id: id },
    });
    if (!target) throw new NotFoundException('유효하지 않은 Id');

    await this.areaRepository.remove(target);
    return `${target?.name} 삭제됨`;
  }
}
