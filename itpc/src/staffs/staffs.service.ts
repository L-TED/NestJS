import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Staffs } from './entities/staff.entity';

@Injectable()
export class StaffsService {
  constructor(
    @InjectRepository(Staffs) private staffRepo: Repository<Staffs>,
  ) {}

  async create(createStaffDto: CreateStaffDto) {
    const newStaff = await this.staffRepo.create(createStaffDto);
    const result = await this.staffRepo.save(newStaff);
    return `${result.name} 직원 정보 등록 완료`;
  }

  async findAll() {
    const getStaffs = await this.staffRepo.find();
    return getStaffs;
  }

  async findOne(id: number) {
    const target = await this.staffRepo.findOne({ where: { id: id } });
    if (!target) throw new NotFoundException({ message: '유효하지 않은 ID' });
    return target;
  }

  async update(id: number, updateStaffDto: UpdateStaffDto) {
    return `This action updates a #${id} Staff`;
  }

  async remove(id: number) {
    const target = await this.staffRepo.findOne({ where: { id: id } });
    if (!target) throw new NotFoundException({ message: '유효하지 않은 ID' });
    await this.staffRepo.remove(target);
    return `${target.id} 정보 삭제 완료`;
  }
}
