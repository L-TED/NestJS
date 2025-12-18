import { Areas } from 'src/areas/entities/area.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Index('areas_id', ['areasId'], {})
@Entity('foodtrucks', { schema: 'zoo' })
export class Foodtrucks {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'name', length: 255 })
  name: string;

  @Column('varchar', { name: 'owner', length: 255 })
  owner: string;

  @Column('varchar', { name: 'main', length: 255 })
  main: string;

  @Column('varchar', { name: 'subs', length: 255 })
  subs: string;

  @Column('int', { name: 'areas_id', nullable: true })
  areasId: number | null;

  @ManyToOne(() => Areas, (areas) => areas.foodtrucks, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'areas_id', referencedColumnName: 'id' }])
  areas: Areas;
}
