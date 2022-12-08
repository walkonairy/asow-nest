import { Body, Controller, Get, Post } from '@nestjs/common';
import { AccountService } from '../service/account.service';
import Account from '../entity/account.entity';
import RestResponse from '../dto/response';

@Controller('/user')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('/add')
  async addUser(@Body() user: Account): Promise<RestResponse<any>> {
    const isOk = await this.accountService.addUser(user);
    if (isOk) {
      return RestResponse.ok('用户创建成功');
    } else {
      return RestResponse.fail('用户创建失败');
    }
  }
}
