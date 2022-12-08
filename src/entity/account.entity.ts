import { Entity, Column } from 'typeorm';
import BaseEntity from './base.entity';

@Entity('account')
class Account extends BaseEntity {
  @Column({ type: 'varchar' })
  username: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar' })
  salt: string;

  @Column({ type: 'datetime' })
  lastLoginTime: Date;
}

export default Account;
