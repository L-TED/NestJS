import { Usages } from 'src/usages/entities/usage.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('guests', { schema: 'itpc' })
export class Guests {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'name', length: 255 })
  name: string;

  @Column('int', { name: 'age' })
  age: number;

  @Column('varchar', { name: 'password', length: 255 })
  password: string;

  @OneToMany(() => Usages, (usages) => usages.guest)
  usages: Usages[];
}
