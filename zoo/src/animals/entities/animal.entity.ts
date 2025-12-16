import { Zookeeper } from 'src/zookeepers/entities/zookeeper.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Animal {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  name: string;
  @Column()
  systematics: string;
  @Column()
  count: number;

  @ManyToOne(() => Zookeeper, (Zookeeper) => Zookeeper.animals)
  zookeeper: Zookeeper;
}
