import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';
import { json } from 'stream/consumers';

@Injectable()
export class StudentService {
  student: Student[] = [
    { id: 1, name: '홍길동', age: 20 },
    { id: 2, name: '김철수', age: 22 },
    { id: 3, name: '이영희', age: 21 },
  ];

  create(createStudentDto: CreateStudentDto) {
    return 'This action adds a new student';
  }

  findAll() {
    return this.student;
  }

  findOne(id: number) {
    if (id < 1 || isNaN(id)) {
      return '잘못된 ID입니다.';
    }
    const target = this.student.find((v) => v.id === id);
    if (!target) {
      return '존재하지 않는 학생입니다.';
    }
    return this.student.find((v) => v.id === id);
  }
  update(id: number, updateStudentDto: UpdateStudentDto) {
    return 'This action updates a #' + id + ' student';
  }
  remove(id: number) {
    if (id < 1 || isNaN(id)) {
      return '잘못된 ID입니다.';
    }
    const target = this.student.find((v) => v.id === id);
    if (!target) {
      return '존재하지 않는 학생입니다.';
    }
    this.student = this.student.filter((v) => v.id != id);
    return `해당 학생의 정보가 삭제되었습니다.`;
  }
}
