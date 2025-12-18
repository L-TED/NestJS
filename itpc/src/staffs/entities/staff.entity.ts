import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('staffs', { schema: 'itpc' })
export class Staffs {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'name', length: 255 })
  name: string;

  @Column('date', { name: 'hireYear' })
  hireYear: string;
}
