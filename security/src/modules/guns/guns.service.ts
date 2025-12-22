import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGunDto } from './dto/create-gun.dto';
import { UpdateGunDto } from './dto/update-gun.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Guns } from './entities/gun.entity';

@Injectable()
export class GunsService {
  constructor(@InjectRepository(Guns) private gunRepo: Repository<Guns>) {}

  async create(createGunDto: CreateGunDto) {
    const newGun = await this.gunRepo.create(createGunDto);
    const result = await this.gunRepo.save(newGun);
    return `${result.name} 총기 등록 완료`;
  }

  async findAll() {
    const getGuns = await this.gunRepo.find();
    return getGuns;
  }

  async findOne(id: number) {
    const target = await this.gunRepo.findOne({ where: { id: id } });
    if (!target) throw new NotFoundException({ message: '유효하지 않은 ID' });
    return target;
  }

  async update(id: number, updateGunDto: UpdateGunDto) {
    return `This action updates a #${id}`;
  }

  async remove(id: number) {
    const target = await this.gunRepo.findOne({ where: { id: id } });
    if (!target) throw new NotFoundException({ message: '유효하지 않은 ID' });
    await this.gunRepo.remove(target);
    return `${target.id} 정보 삭제 완료`;
  }
}
