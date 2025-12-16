import { Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from './entities/member.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member) private memberRepository: Repository<Member>,
  ) {}

  async create(createMemberDto: CreateMemberDto) {
    const member = await this.memberRepository.create(createMemberDto);
    const result = await this.memberRepository.save(member);
    return `${result.name} 님이 등록 완료 되었습니다.`;
  } 

  async findAll() {
    const members = await this.memberRepository.find();
    return members;
  }

  async findOne(id: number) {
    const member = await this.memberRepository.findOneBy({
      id: id,
    });
    return member;
  }

  update(id: number, updateMemberDto: UpdateMemberDto) {
    return `This action updates a #${id} member`;
  }

  remove(id: number) {
    return `This action removes a #${id} member`;
  }
}
