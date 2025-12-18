import { Computers } from 'src/computers/entities/computer.entity';
import { Guests } from 'src/guests/entities/guest.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Index('computerId', ['computerId'], {})
@Index('guestId', ['guestId'], {})
@Entity('usages', { schema: 'itpc' })
export class Usages {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'computerId' })
  computerId: number;

  @Column('int', { name: 'guestId' })
  guestId: number;

  @ManyToOne(() => Computers, (computers) => computers.usages, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'computerId', referencedColumnName: 'id' }])
  computer: Computers;

  @ManyToOne(() => Guests, (guests) => guests.usages, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'guestId', referencedColumnName: 'id' }])
  guest: Guests;
}
