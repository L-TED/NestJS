import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGuestDto } from './dto/create-guest.dto';
import { UpdateGuestDto } from './dto/update-guest.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Guests } from './entities/guest.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GuestsService {
  constructor(
    @InjectRepository(Guests) private guestRepo: Repository<Guests>,
  ) {}

  async create(createGuestDto: CreateGuestDto) {
    const newComputer = await this.guestRepo.create(createGuestDto);
    const result = await this.guestRepo.save(newComputer);
    return `${result.name} 회원 정보 등록 완료`;
  }

  async findAll() {
    const getGuests = await this.guestRepo.find();
    return getGuests;
  }

  async findOne(id: number) {
    const target = await this.guestRepo.findOne({ where: { id: id } });
    if (!target) throw new NotFoundException({ message: '유효하지 않은 ID' });
    return target;
  }

  async update(id: number, updateGuestDto: UpdateGuestDto) {
    return `This action updates a #${id} computer`;
  }

  async remove(id: number) {
    const target = await this.guestRepo.findOne({ where: { id: id } });
    if (!target) throw new NotFoundException({ message: '유효하지 않은 ID' });
    await this.guestRepo.remove(target);
    return `${target.id} 정보 삭제 완료`;
  }
}
