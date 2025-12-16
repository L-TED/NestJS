import { Injectable } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { Teacher } from './entities/teacher.entity';

@Injectable()
export class TeacherService {
  teacher: Teacher[] = [
    {
      id: 1,
      name: '박금선',
      nickname: ['골드라인'],
      age: 36,
      subjects: ['수학'],
    },
    {
      id: 2,
      name: '박태준',
      nickname: ['TJ', '핵빠따'],
      age: 38,
      subjects: ['과학', '기술가정'],
    },
    {
      id: 3,
      name: '변재선',
      nickname: ['대변', '똥재선'],
      age: 52,
      subjects: ['수학'],
    },
  ];

  create(createTeacherDto: CreateTeacherDto) {
    return 'This action adds a new teacher';
  }

  findAll() {
    return this.teacher;
  }

  findOne(id: number) {
    if (id < 1 || isNaN(id)) {
      return '잘못된 ID입니다.';
    }
    const target = this.teacher.find((v) => v.id === id);
    if (!target) {
      return '존재하지 않는 교사입니다.';
    }
    return this.teacher.find((v) => v.id === id);
  }

  update(id: number, updateTeacherDto: UpdateTeacherDto) {
    return `This action updates a #${id} teacher`;
  }

  remove(id: number) {
    if (id < 1 || isNaN(id)) {
      return '잘못된 ID입니다.';
    }
    const target = this.teacher.find((v) => v.id === id);
    if (!target) {
      return '존재하지 않는 교사입니다.';
    }
    this.teacher = this.teacher.filter((v) => v.id != id);
    return '해당 교사의 정보가 삭제되었습니다.';
  }
}
