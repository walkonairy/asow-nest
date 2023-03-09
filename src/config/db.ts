import { TypeOrmModule } from '@nestjs/typeorm';

const productConfig = TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '123456',
  database: 'asow',
  synchronize: true,
  entities: ['dist/**/*.entity{.ts,.js}'],
});

const localConfig = TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '123456',
  database: 'asow',
  synchronize: true,
  entities: ['dist/**/*.entity{.ts,.js}'],
});

const dbConfig = process.env.NODE_ENV ? productConfig : localConfig;

export default dbConfig;
