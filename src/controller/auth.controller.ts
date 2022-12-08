import { AuthService } from '@/service/auth.service';
import { Body, Controller, Post, Request } from '@nestjs/common';
import Account from '@/entity/account.entity';
import RestResponse from '@/dto/response';
import JwtToken from '@/utils/auth/jwt.token';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body() params: Account) {
    const authResult = await this.authService.validateUser(
      params.username,
      params.password,
    );

    if (authResult.isOk) {
      const jwt = this.authService.certificate(authResult.data);
      return RestResponse.ok<JwtToken>(jwt);
    } else {
      return RestResponse.fail(authResult.data);
    }
  }
}
