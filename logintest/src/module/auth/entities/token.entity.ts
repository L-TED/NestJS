import { Users } from 'src/module/users/entities/user.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Index('userId', ['userId'], {})
@Entity('tokens', { schema: 'token' })
export class Tokens {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'hashedToken', length: 255 })
  hashedToken: string;

  @Column('tinyint', { name: 'isRevoked', width: 1, default: () => "'0'" })
  isRevoked: boolean;

  @Column('datetime', { name: 'expiresAt' })
  expiresAt: Date;

  @Column('varchar', { name: 'userId', nullable: true, length: 255 })
  userId: string | null;

  @ManyToOne(() => Users, (users) => users.tokens, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  user: Users;
}
