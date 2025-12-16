import { Injectable } from '@nestjs/common';
import { CreateClassroomDto } from './dto/create-classroom.dto';
import { UpdateClassroomDto } from './dto/update-classroom.dto';
import { Classroom } from './entities/classroom.entity';

@Injectable()
export class ClassroomService {
  classrooms: Classroom[] = [
    { id: 1, roomName: 'A101', capacity: 30 },
    { id: 2, roomName: 'B202', capacity: 25 },
    { id: 3, roomName: 'C303', capacity: 20 },
  ];

  create(createClassroomDto: CreateClassroomDto) {
    this.classrooms.push({
      id: this.classrooms.length + 1,
      ...createClassroomDto,
    });
    return '강의실 추가 완료';
  }

  findAll() {
    return this.classrooms;
  }

  findOne(id: number) {
    const target = this.classrooms.find((v) => v.id == id);
    return target ?? '해당 ID의 강의실은 없습니다.';
  }

  update(id: number, updateClassroomDto: UpdateClassroomDto) {
    return `This action updates a #${id} classroom`;
  }

  remove(id: number) {
    const target = this.classrooms.find((v) => v.id == id);
    if (!target) '없는 강의실 ID입니다';
    this.classrooms = this.classrooms.filter((v) => v.id != id);
    return '강의실 정보 삭제 완료';
  }
}
