import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateComputerDto } from './dto/create-computer.dto';
import { UpdateComputerDto } from './dto/update-computer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Computers } from './entities/computer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ComputersService {
  constructor(
    @InjectRepository(Computers) private computerRepo: Repository<Computers>,
  ) {}

  async create(createComputerDto: CreateComputerDto) {
    const newComputer = await this.computerRepo.create(createComputerDto);
    const result = await this.computerRepo.save(newComputer);
    return `${result.id} 컴퓨터 등록 완료`;
  }

  async findAll() {
    const getComputers = await this.computerRepo.find();
    return getComputers;
  }

  async findOne(id: number) {
    const target = await this.computerRepo.findOne({ where: { id: id } });
    if (!target) throw new NotFoundException({ message: '유효하지 않은 ID' });
    return target;
  }

  async update(id: number, updateComputerDto: UpdateComputerDto) {
    return `This action updates a #${id}`;
  }

  async remove(id: number) {
    const target = await this.computerRepo.findOne({ where: { id: id } });
    if (!target) throw new NotFoundException({ message: '유효하지 않은 ID' });
    await this.computerRepo.remove(target);
    return `${target.id} 정보 삭제 완료`;
  }
}
