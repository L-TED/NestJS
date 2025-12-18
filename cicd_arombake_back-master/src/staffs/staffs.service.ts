import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Staffs } from './entities/staff.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StaffsService {
  constructor(
    @InjectRepository(Staffs)
    private staffsRepo: Repository<Staffs>,
  ) {}
  async create(createStaffDto: CreateStaffDto) {
    const staff = await this.staffsRepo.create(createStaffDto);
    await this.staffsRepo.save(staff);
    return `${staff.name}이 등록 되었습니다.`;
  }

  async findAll() {
    return await this.staffsRepo.find();
  }

  async findOne(id: number) {
    const staff = await this.staffsRepo.findOne({ where: { id } });
    if (!staff) throw new NotFoundException('해당 id 존재 하지 않습니다.');
    return staff;
  }

  async remove(id: number) {
    const staff = await this.staffsRepo.findOne({ where: { id } });
    if (!staff) throw new NotFoundException('해당 id 존재 하지 않습니다.');
    await this.staffsRepo.remove(staff);
    return `${staff.name} 퇴사완료 했습니다.`;
  }
}
