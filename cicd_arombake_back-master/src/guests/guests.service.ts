import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGuestDto } from './dto/create-guest.dto';
import { UpdateGuestDto } from './dto/update-guest.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Guests } from './entities/guest.entity';
import { Tiers } from 'src/tiers/entities/tier.entity';

@Injectable()
export class GuestsService {
  constructor(
    @InjectRepository(Guests)
    private guestsRepo: Repository<Guests>,
    @InjectRepository(Tiers)
    private tiersRepo: Repository<Tiers>,
  ) {}
  async create(createGuestDto: CreateGuestDto) {
    const newTier = await this.tiersRepo.findOne({
      where: { id: createGuestDto.tierId },
    });
    if (!newTier) throw new NotFoundException('해당 티어 없습니다.');

    const guest = await this.guestsRepo.create(createGuestDto);
    await this.guestsRepo.save(guest);
    return `${guest.name}이 등록 되었습니다.`;
  }

  async findAll() {
    return await this.guestsRepo.find({ relations: ['tier'] });
  }

  async findOne(id: number) {
    const guest = await this.guestsRepo.findOne({ where: { id } });
    if (!guest) throw new NotFoundException('해당 id 존재 하지 않습니다.');
    return guest;
  }

  async remove(id: number) {
    const guest = await this.guestsRepo.findOne({ where: { id } });
    if (!guest) throw new NotFoundException('해당 id 존재 하지 않습니다.');
    await this.guestsRepo.remove(guest);
    return `${guest.name} 탈퇴 했습니다.`;
  }
}
