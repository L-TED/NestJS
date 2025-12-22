import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/user.entity';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(Users) private userRepo: Repository<Users>) {}

  async create(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;
    const user = await this.userRepo.findOne({ where: { email: email } });
    if (user) throw new ConflictException('이메일이 중복됩니다.');
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.userRepo.create({
      email,
      password: hashedPassword,
    });
    const result = await this.userRepo.save(newUser);
    return `${result.email} 유저 등록 완료`;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id}`;
  }

  async remove(email: string) {
    const targetUser = await this.userRepo.findOne({ where: { email } });
    if (!targetUser)
      throw new NotFoundException({ message: '유효하지 않은 ID' });
    await this.userRepo.remove(targetUser);
    return `${targetUser.id} 유저 정보 삭제 완료`;
  }
}
