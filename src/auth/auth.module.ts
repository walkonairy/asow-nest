import { Module } from '@nestjs/common';
import { AuthService } from '@/auth/auth.service';
import { AccountModule } from '@/account/account.module';
import { JwtModule } from '@nestjs/jwt';
import ConstantKey from '@/auth/jwt/constantKey';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from '@/auth/jwt/local.strategy';
import { JwtStrategy } from '@/auth/jwt/jwt.strategy';
import { AuthController } from '@/auth/auth.controller';

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
