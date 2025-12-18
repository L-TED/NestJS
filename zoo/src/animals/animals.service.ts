import { Injectable, NotFoundException } from '@nestjs/common';
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
    if (!getZookeeper) throw new NotFoundException('담당 조련사가 없습니다.');
    const createAnimal = await this.animalRepository.create({
      ...createAnimalDto,
      zookeeper: getZookeeper,
    });
    const result = await this.animalRepository.save(createAnimal);

    return result;
  }

  async findAll() {
    const animals = await this.animalRepository.find();
    return animals;
  }

  async findOne(id: number) {
    const animal = await this.animalRepository.findOne({ where: { id: id } });
    if (!animal) throw new NotFoundException('존재하지 않는 동물입니다.');
    return animal;
  }

  update(id: number, updateAnimalDto: UpdateAnimalDto) {
    return `This action updates a #${id} animal`;
  }

  async remove(id: number) {
    const target = this.animalRepository.findOneBy({ id: id });
    if (!target) throw new NotFoundException('유효하지 않은 ID입니다.');
    await this.animalRepository.delete({ id: id });
    return { message: `삭제됨`, data: target };
  }
}
