import { Module } from '@nestjs/common';
import { AuthModule } from '@/auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './account/account.module';
import dbConfig from './config/db';

@Module({
  imports: [dbConfig, AccountModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
