import { Injectable } from '@nestjs/common';
import { CreateMentorDto } from './dto/create-mentor.dto';
import { UpdateMentorDto } from './dto/update-mentor.dto';
import { Mentor } from './entities/mentor.entity';

@Injectable()
export class MentorService {
  mentors: Mentor[] = [
    { id: 1, name: 'Alice', position: 'Senior Developer' },
    { id: 2, name: 'Bob', position: 'Project Manager' },
    { id: 3, name: 'Charlie', position: 'UX Designer' },
  ];

  create(createMentorDto: CreateMentorDto) {
    this.mentors.push({
      id: this.mentors.length + 1,
      ...createMentorDto,
    });
    return '멘토 추가 완료';
  }

  findAll() {
    return this.mentors;
  }

  findOne(id: number) {
    const target = this.mentors.find((v) => v.id == id);
    return target ?? '해당 ID의 멘토는 없습니다.';
  }

  update(id: number, updateMentorDto: UpdateMentorDto) {
    return `This action updates a #${id} mentor`;
  }

  remove(id: number) {
    const target = this.mentors.find((v) => v.id == id);
    if (!target) '없는 멘토 ID입니다';
    this.mentors.filter((v) => v.id != id);
    return '멘토 정보 삭제 완료';
  }
}
