import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(Users) private userRepo: Repository<Users>) {}

  async create(createUserDto: CreateUserDto) {
    const { nickname, hashedPassword } = createUserDto;
    const user = await this.userRepo.findOne({ where: { nickname: nickname } });
    if (user)
      throw new ConflictException('해당 닉네임은 사용중인 닉네임입니다.');
    const newPw = await bcrypt.hash(hashedPassword, 10);
    const newUser = await this.userRepo.create({
      ...createUserDto,
      hashedPassword: newPw,
    });
    const result = await this.userRepo.save(newUser);
    return `${result.nickname} 계정을 생성했습니다.`;
  }

  async updatePassword(id: string, updateUserDto: UpdateUserDto) {
    const { hashedPassword } = updateUserDto;
    if (!hashedPassword)
      throw new UnauthorizedException('비밀번호를 확인하십시오.');
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) throw new UnauthorizedException('비밀번호를 확인하십시오.');

    const isSame = await bcrypt.compare(
      user.hashedPassword,
      hashedPassword ?? '',
    );
    if (!isSame) throw new UnauthorizedException('비밀번호를 확인하십시오.');

    const newPW = await bcrypt.hash(hashedPassword, 10);
    await this.userRepo.update(id, { hashedPassword: newPW });
    return `비밀번호가 변경되었습니다.`;
  }

  async updateNickname(id: string, updateUserDto: UpdateUserDto) {
    const { nickname } = updateUserDto;
    if (!nickname) throw new UnauthorizedException('닉네임을 확인하십시오.');
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) throw new UnauthorizedException('닉네임을 확인하십시오.');

    await this.userRepo.update(id, { nickname });
    return `닉네임이 변경되었습니다.`;
  }

  async remove(id: string) {
    const targetUser = await this.userRepo.findOne({ where: { id } });
    if (!targetUser)
      throw new NotFoundException({ message: '존재하지 않는 아이디입니다.' });
    await this.userRepo.remove(targetUser);
    return `${targetUser.id} 유저 정보 삭제 완료`;
  }

  async me(id: string) {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('존재하지 않는 아이디 입니다.');
    return `아이디: ${user.id}, 닉네임: ${user.nickname}`;
  }
}
