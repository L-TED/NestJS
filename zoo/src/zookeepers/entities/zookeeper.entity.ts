import { Animal } from 'src/animals/entities/animal.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Zookeeper {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  age: number;
  @Column()
  position: string;

  @OneToMany(() => Animal, (animal) => animal.zookeeper)
  animals: Animal[];
}
