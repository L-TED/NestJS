import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsageDto } from './dto/create-usage.dto';
import { UpdateUsageDto } from './dto/update-usage.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usages } from './entities/usage.entity';
import { Repository } from 'typeorm';
import { Computers } from 'src/computers/entities/computer.entity';
import { Guests } from 'src/guests/entities/guest.entity';

@Injectable()
export class UsagesService {
  constructor(
    @InjectRepository(Usages) private usageRepo: Repository<Usages>,
    @InjectRepository(Computers) private computerRepo: Repository<Computers>,
    @InjectRepository(Guests) private guestRepo: Repository<Guests>,
  ) {}

  async create(createUsageDto: CreateUsageDto) {
    const newComputer = await this.computerRepo.findOne({
      where: { id: createUsageDto.computerId },
    });
    const newGuest = await this.guestRepo.findOne({
      where: { id: createUsageDto.guestId },
    });
    if (!newComputer || !newGuest)
      throw new NotFoundException('유효하지 않은 ID');
    const usage = await this.usageRepo.create(createUsageDto);
    await this.usageRepo.save(usage);
    return `${newComputer?.id}번 컴퓨터를 ${newGuest?.id} 번 고객이 사용 시작했습니다.`;
  }

  async findAll() {
    const usages = await this.usageRepo.find();
    return usages;
  }

  async findOne(id: number) {
    const usage = await this.usageRepo.findOne({ where: { id: id } });
    if (!usage) throw new NotFoundException('컴퓨터 사용이 끝났습니다.');
    return usage;
  }

  async update(id: number, updateUsageDto: UpdateUsageDto) {
    return `This action updates a #${id} usage`;
  }

  async remove(id: number) {
    const target = await this.usageRepo.findOne({ where: { id: id } });
    if (!target) throw new NotFoundException('유효하지 않은 ID입니다.');
    await this.usageRepo.remove(target);
    return `${target.id} 사용 해제됨.`;
  }
}
