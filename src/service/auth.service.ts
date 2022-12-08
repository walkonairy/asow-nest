import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccountService } from '@/service/account.service';
import { matches } from '@/utils/auth/cryptogram';
import JwtToken from '@/utils/auth/jwt.token';
import Account from '@/entity/account.entity';
import Result from '@/dto/result';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountService: AccountService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.accountService.findOne(username);
    const result = new Result();

    if (!user) {
      result.data = '登陆失败，请检查账号或者密码输入是否正确';
      return result;
    }

    const salt = user.salt;
    const dbPwd = user.password;

    if (matches(salt, password, dbPwd)) {
      result.isOk = true;
      result.data = user;
    } else {
      result.data = '登陆失败，请检查账号或者密码输入是否正确';
    }

    return result;
  }

  certificate(user: Account) {
    const payload = {
      username: user.username,
      sub: user.id,
      // role: user.role,
    };

    const jwt = new JwtToken();
    jwt.userId = user.id;
    jwt.token = this.jwtService.sign(payload);

    return jwt;
  }
}
