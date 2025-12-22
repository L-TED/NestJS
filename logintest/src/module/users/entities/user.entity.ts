import { Tokens } from 'src/module/auth/entities/token.entity';
import { Column, Entity, Index, OneToMany } from 'typeorm';

@Index('nickname', ['nickname'], { unique: true })
@Entity('users', { schema: 'token' })
export class Users {
  @Column('varchar', { primary: true, name: 'id', length: 255 })
  id: string;

  @Column('varchar', { name: 'nickname', unique: true, length: 255 })
  nickname: string;

  @Column('varchar', { name: 'hashedPassword', length: 255 })
  hashedPassword: string;

  @OneToMany(() => Tokens, (tokens) => tokens.user)
  tokens: Tokens[];
}
