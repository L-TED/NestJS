import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFoodtruckDto } from './dto/create-foodtruck.dto';
import { UpdateFoodtruckDto } from './dto/update-foodtruck.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Foodtrucks } from './entities/foodtruck.entity';
import { Areas } from 'src/areas/entities/area.entity';

@Injectable()
export class FoodtrucksService {
  constructor(
    @InjectRepository(Foodtrucks)
    private foodtruckRepository: Repository<Foodtrucks>,
    @InjectRepository(Areas) private areaRepository: Repository<Areas>,
  ) {}

  async create(createFoodtruckDto: CreateFoodtruckDto) {
    const findArea = await this.areaRepository.findOne({
      where: { id: createFoodtruckDto.area_id },
    });
    if (!findArea)
      throw new NotFoundException('해당 구역은 존재하지 않는 구역입니다.');
    const newFoodTruck = await this.foodtruckRepository.create({
      ...createFoodtruckDto,
      areas: findArea,
    });
    await this.foodtruckRepository.save(newFoodTruck);
    return `${newFoodTruck.name} 생성 완료`;
  }

  async findAll() {
    const foodtrucks = await this.foodtruckRepository.find();
    return foodtrucks;
  }

  async findOne(id: number) {
    const foodtruck = this.foodtruckRepository.findOne({ where: { id: id } });
    if (!foodtruck)
      throw new NotFoundException('존재하지 않는 푸드트럭입니다.');
    return foodtruck;
  }

  update(id: number, updateFoodtruckDto: UpdateFoodtruckDto) {
    return `This action updates a #${id} foodtruck`;
  }

  async remove(id: number) {
    const target = await this.foodtruckRepository.findOne({
      where: { id: id },
    });
    if (!target) throw new NotFoundException('유효하지 않은 Id');

    await this.foodtruckRepository.remove(target);
    return `${target?.name} 삭제됨`;
  }
}
