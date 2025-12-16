import { Injectable } from '@nestjs/common';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CoffeeService {
  coffees: Coffee[] = [
    // { id: 1, name: '아메리카노', price: 3000, shots: 2 },
    // { id: 2, name: '카페라떼', price: 4500, shots: 3 },
    // { id: 3, name: '카푸치노', price: 4000, shots: 1 },
  ];

  constructor(
    @InjectRepository(Coffee) private coffeeRepository: Repository<Coffee>,
  ) {}

  async create(createCoffeeDto: CreateCoffeeDto) {
    const coffee = await this.coffeeRepository.create(createCoffeeDto);
    const result = await this.coffeeRepository.save(coffee);
    return `${result.name} 등록 완료`;
  }

  async findAll() {
    const coffees = await this.coffeeRepository.find();
    return coffees;
  }

  async findOne(id: number) {
    const coffee = await this.coffeeRepository.find({
      where: {
        id: id,
      },
    });
    return coffee;
  }

  update(id: number, updateCoffeeDto: UpdateCoffeeDto) {
    return `This action updates a #${id} coffee`;
  }

  remove(id: number) {
    const target = this.coffees.filter((v) => v.id != id);
    if (!target) '유효하지 않은 ID 입니다';
    return `커피 삭제 완료`;
  }
}
