import { Module } from '@nestjs/common';
import { AuthService } from '@/service/auth.service';
import { AccountModule } from '@/module/account.module';
import { JwtModule } from '@nestjs/jwt';
import ConstantKey from '@/constant/constantKey';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '@/utils/auth/local.strategy';
import { JwtStrategy } from '@/utils/auth/jwt.strategy';
import { AuthController } from '@/controller/auth.controller';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: ConstantKey.SIGNING_KEY,
      signOptions: { expiresIn: '8h' },
    }),
    AccountModule,
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
