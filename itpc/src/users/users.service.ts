import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserLoginDto } from '../auth/dto/login-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(Users) private userRepo: Repository<Users>) {}

  async create(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    const checkEmail = await this.userRepo.findOne({ where: { email: email } });
    if (checkEmail) throw new ConflictException('이메일이 중복됩니다.');
    const hashedPw = await bcrypt.hash(password, 10);
    const newUser = await this.userRepo.create({
      email,
      password: hashedPw,
    });
    await this.userRepo.save(newUser);
    return `Id: ${newUser.id} 유저 정보 추가`;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    const target = await this.userRepo.findOne({ where: { id } });
    if (!target) throw new NotFoundException('유효하지 않은 ID 입니다.');
    await this.userRepo.remove(target);
    return `ID: ${target.id} 유저 정보 삭제됨`;
  }
}
