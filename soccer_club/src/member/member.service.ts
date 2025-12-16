import { Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Member } from './entities/member.entity';

@Injectable()
export class MemberService {
  members: Member[] = [
    {
      id: 1,
      name: '홍길동',
      age: 30,
      registeredAt: new Date('2021-01-01'),
      position: ['공격수'],
    },
    {
      id: 2,
      name: '김철수',
      age: 28,
      registeredAt: new Date('2020-02-15'),
      position: ['미드필더', '수비수'],
    },
    {
      id: 3,
      name: '이영희',
      age: 26,
      registeredAt: new Date('2019-03-10'),
      position: ['골키퍼'],
    },
  ];

  create(createMemberDto: CreateMemberDto) {
    this.members.push({
      id: this.members.length + 1,
      registeredAt: new Date(),
      ...createMemberDto,
    });
    return '멤버가 추가되었습니다.';
  }

  findAll() {
    return this.members;
  }

  findOne(id: number) {
    return `This action returns a #${id} member`;
  }

  update(id: number, updateMemberDto: UpdateMemberDto) {
    return `This action updates a #${id} member`;
  }

  remove(id: number) {
    return `This action removes a #${id} member`;
  }
}
