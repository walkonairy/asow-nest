import { Entity, Column } from 'typeorm';
import BaseEntity from './base.entity';

@Entity('account')
class Account extends BaseEntity {
  @Column({ type: 'varchar' })
  username: string;

  @Column({ type: 'varchar' })
  nickname: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'datetime' })
  lastLoginTime: Date;
}

export default Account;
