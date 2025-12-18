import { Foodtrucks } from 'src/foodtrucks/entities/foodtruck.entity';
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Index('name', ['name'], { unique: true })
@Entity('areas', { schema: 'zoo' })
export class Areas {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'name', unique: true, length: 255 })
  name: string;

  @Column('int', { name: 'size' })
  size: number;

  @OneToMany(() => Foodtrucks, (foodtrucks) => foodtrucks.areas)
  foodtrucks: Foodtrucks[];
}
