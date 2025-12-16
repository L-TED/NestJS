import { Injectable } from '@nestjs/common';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Animal } from './entities/animal.entity';
import { Repository } from 'typeorm';
import { Zookeeper } from 'src/zookeepers/entities/zookeeper.entity';

@Injectable()
export class AnimalsService {
  constructor(
    @InjectRepository(Animal) private animalRepository: Repository<Animal>,
    @InjectRepository(Zookeeper)
    private zookeeperRepository: Repository<Zookeeper>,
  ) {}

  async create(createAnimalDto: CreateAnimalDto) {
    const getZookeeper = await this.zookeeperRepository.findOne({
      where: { id: createAnimalDto.zookeeperId },
    });
    if (!getZookeeper) return '담당 조련사가 없습니다.';
    const createAnimal = await this.animalRepository.create(createAnimalDto);
    const result = await this.animalRepository.save(createAnimal);

    return result;
  }

  async findAll() {
    const animals = await this.animalRepository.find();
    return animals;
  }

  async findOne(id: number) {
    const animal = await this.animalRepository.findOneBy({ id: id });
    return animal ?? '해당 동물은 없습니다.';
  }

  update(id: number, updateAnimalDto: UpdateAnimalDto) {
    return `This action updates a #${id} animal`;
  }

  async remove(id: number) {
    const target = this.animalRepository.findOneBy({ id: id });
    if (!target) '유효하지 않은 ID입니다.';
    await this.animalRepository.delete({ id: id });
    return { message: `삭제됨`, data: target };
  }
}
