import { Injectable } from '@nestjs/common';
import { CreateGroundDto } from './dto/create-ground.dto';
import { UpdateGroundDto } from './dto/update-ground.dto';
import { Ground } from './entities/ground.entity';

@Injectable()
export class GroundService {
  ground: Ground[] = [
    {
      id: 1,
      name: '서울 풋살장',
      isAvailable: true,
      address: '서울시 강남구',
      scale: '10 인용',
    },
    {
      id: 2,
      name: '부산 축구장',
      isAvailable: false,
      address: '부산시 해운대구',
      scale: '11 인용',
    },
    {
      id: 3,
      name: '대구 스포츠파크',
      isAvailable: true,
      address: '대구시 중구',
      scale: '9 인용',
    },
  ];

  create(createGroundDto: CreateGroundDto) {
    this.ground.push({ id: this.ground.length + 1, ...createGroundDto });
    return '축구장 생성 성공';
  }

  findAll() {
    return this.ground;
  }

  findOne(id: number) {
    return `This action returns a #${id} ground`;
  }

  update(id: number, updateGroundDto: UpdateGroundDto) {
    return `This action updates a #${id} ground`;
  }

  remove(id: number) {
    return `This action removes a #${id} ground`;
  }
}
