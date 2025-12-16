import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentService {
  students: Student[] = [
    { id: 1, name: '홍길동', age: 20, phoneNumber: '010-1234-5678' },
    { id: 2, name: '김철수', age: 22, phoneNumber: '010-8765-4321' },
    { id: 3, name: '이영희', age: 19, phoneNumber: '010-1111-2222' },
  ];

  create(createStudentDto: CreateStudentDto) {
    this.students.push({
      id: this.students.length + 1,
      ...createStudentDto,
    });
    return '학생 추가 완료';
  }

  findAll() {
    return this.students;
  }

  findOne(id: number) {
    const target = this.students.find((v) => v.id == id);
    return target ?? '해당 ID의 학생은 없습니다.';
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return `This action updates a #${id} student`;
  }

  remove(id: number) {
    const target = this.students.find((v) => v.id == id);
    if (!target) '없는 학생 ID입니다';
    this.students = this.students.filter((v) => v.id != id);
    return `학생 정보 삭제 완료`;
  }
}
