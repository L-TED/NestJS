import { Injectable } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { Doctor } from './entities/doctor.entity';

@Injectable()
export class DoctorService {
  doctor: Doctor[] = [
    {
      id: 1,
      name: '김철수',
      major: '외과',
      careers: ['서울대병원', '삼성서울병원'],
    },
    { id: 2, name: '이영희', major: '내과', careers: ['아산병원'] },
    {
      id: 3,
      name: '박민수',
      major: '소아과',
      careers: ['세브란스병원', '강남성심병원'],
    },
  ];

  create(createDoctorDto: CreateDoctorDto) {
    const { name, major, careers } = createDoctorDto;

    this.doctor.push({ id: this.doctor.length + 1, name, major, careers });
    return `${name} 의 정보가 등록되었습니다.`;
  }

  findAll() {
    return this.doctor;
  }

  findOne(id: number) {
    if (id < 1 || isNaN(id)) return '유효하지 않은 id입니다.';
    const target = this.doctor.find((v) => v.id == id);
    if (!target) return '해당 id의 의사가 없습니다.';
    return target;
  }

  update(id: number, updateDoctorDto: UpdateDoctorDto) {
    if (id < 1 || isNaN(id)) return '유효하지 않은 id입니다.';
    const target = this.doctor.find((v) => v.id == id);
    if (!target) return '해당 id의 의사가 없습니다.';
    const { name, major, careers } = updateDoctorDto;
    this.doctor = this.doctor.map((v) => {
      if (v.id == id) {
        return {
          id: v.id,
          name: name ?? v.name,
          major: major ?? v.major,
          careers: careers ?? v.careers,
        };
      } else {
        return v;
      }
    });
    return `해당 의사의 정보가 수정되었습니다.`;
  }

  remove(id: number) {
    if (id < 1 || isNaN(id)) return '유효하지 않은 id입니다.';
    const target = this.doctor.find((v) => v.id == id);
    if (!target) return '해당 id의 의사가 없습니다.';
    this.doctor = this.doctor.filter((v) => v.id != id);
    return `해당 의사의 정보가 삭제되었습니다!`;
  }
}
