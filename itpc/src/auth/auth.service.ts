import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserLoginDto } from './dto/login-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users) private userRepo: Repository<Users>,
    private jwtService: JwtService,
  ) {}

  async login(userLoginDto: UserLoginDto) {
    const user = await this.validateUser(userLoginDto);
    const getToken = this.generateToken();
    return getToken;
  }

  async validateUser(userLoginDto: UserLoginDto) {
    const { email, password } = userLoginDto;
    const user = await this.userRepo.findOne({
      where: { email: email },
    });
    if (!user)
      throw new NotFoundException('이메일 또는 비밀번호를 확인하십시오.');
    const isSame = await bcrypt.compare(password, user.password);
    if (!isSame)
      throw new NotFoundException('이메일 또는 비밀번호를 확인하십시오.');
    return user;
  }

  async generateToken() {
    return this.jwtService.sign(
      { name: 'bakery', main: 'mochi' },
      { expiresIn: '2m', secret: 'yummy' },
    );
  }
}
