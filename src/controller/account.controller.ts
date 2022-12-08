import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AccountService } from '@/service/account.service';
import Account from '@/entity/account.entity';
import RestResponse from '@/dto/response';
import { AuthGuard } from '@nestjs/passport';

@Controller('/user')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('/register')
  async addUser(@Body() user: Account): Promise<RestResponse<any>> {
    const result = await this.accountService.addUser(user);

    if (result.isOk) {
      return RestResponse.ok(result.data);
    } else {
      return RestResponse.fail(result.data);
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/test')
  test() {
    return 'hello world';
  }
}
