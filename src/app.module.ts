import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'dotenv/config';
import * as path from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: String(process.env.DB_PASSWORD),
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
      entities: [path.join(__dirname, '/../**/*.entity{.ts,.js}')],
      migrations: [path.join(__dirname, '/../**/*.entity{.ts,.js}')],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
