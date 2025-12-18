import { Zookeeper } from 'src/zookeepers/entities/zookeeper.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Index('IDX_31a3be0a6dc5997e2aafbafe4d', ['name'], { unique: true })
@Entity('animal', { schema: 'zoo' })
export class Animal {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'name', unique: true, length: 255 })
  name: string;

  @Column('varchar', { name: 'systematics', length: 255 })
  systematics: string;

  @Column('int', { name: 'count' })
  count: number;

  @ManyToOne(() => Zookeeper, (zookeeper) => zookeeper.animals, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'zookeeperId', referencedColumnName: 'id' }])
  zookeeper: Zookeeper;
}
