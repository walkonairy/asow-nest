import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Account from '../entity/account.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}

  async addUser(user: Account): Promise<boolean> {
    user.lastLoginTime = new Date();
    const findUser = await this.accountRepository.findOneBy({
      username: user.username,
    });

    if (findUser?.id) {
      return false;
    }

    await this.accountRepository.save(user);
    return true;
  }
}
