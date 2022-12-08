import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Account from '../entity/account.entity';
import { encryptPassword, makeSalt } from '@/utils/auth/cryptogram';
import Result from '@/dto/result';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}

  async addUser(user: Account): Promise<Result> {
    user.lastLoginTime = new Date();
    const findUser = await this.findOne(user.username);
    const result = new Result();

    if (findUser?.id) {
      result.data = `注册失败, 用户名 [${findUser.username}] 已存在`;
      return result;
    }

    const salt = makeSalt();
    user.password = encryptPassword(user.password, salt);
    user.salt = salt;

    await this.accountRepository.save(user);
    result.isOk = true;
    result.data = '用户创建成功';
    return result;
  }

  findOne(username: string) {
    return this.accountRepository.findOneBy({ username: username });
  }
}
