import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateZookeeperDto } from './dto/create-zookeeper.dto';
import { UpdateZookeeperDto } from './dto/update-zookeeper.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Zookeeper } from './entities/zookeeper.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ZookeepersService {
  constructor(
    @InjectRepository(Zookeeper)
    private zookeeperRepository: Repository<Zookeeper>,
  ) {}

  async create(createZookeeperDto: CreateZookeeperDto) {
    const createZookeeper =
      await this.zookeeperRepository.create(createZookeeperDto);
    const result = await this.zookeeperRepository.save(createZookeeper);
    return result;
  }

  async findAll() {
    const zookeepers = await this.zookeeperRepository.find();
    return zookeepers;
  }

  async findOne(id: number) {
    const zookeeper = await this.zookeeperRepository.findOne({
      where: { id: id },
    });
    if (!zookeeper) throw new NotFoundException('존재하지 않는 직원 입니다.');
    return zookeeper;
  }

  update(id: number, updateZookeeperDto: UpdateZookeeperDto) {
    return `This action updates a #${id} zookeeper`;
  }

  async remove(id: number) {
    const target = this.zookeeperRepository.findOneBy({ id: id });
    if (!target) throw new NotFoundException('유효하지 않은 ID입니다.');
    await this.zookeeperRepository.delete({ id: id });
    return { message: `삭제됨`, data: target };
  }
}
