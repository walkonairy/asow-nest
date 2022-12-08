import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './module/account.module';
import dbConfig from './config/db';

@Module({
  imports: [dbConfig, AccountModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
