import { Animal } from 'src/animals/entities/animal.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('zookeeper', { schema: 'zoo' })
export class Zookeeper {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'name', length: 255 })
  name: string;

  @Column('int', { name: 'age' })
  age: number;

  @Column('varchar', { name: 'position', length: 255 })
  position: string;

  @OneToMany(() => Animal, (animal) => animal.zookeeper)
  animals: Animal[];
}
