import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { AppModule } from '../app.module';
import { MainSeeder } from './seeders/main.seeder';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const dataSource = app.get(DataSource);

  try {
    await new MainSeeder(dataSource).run();
    console.log('Database seeding completed successfully');
  } catch (error) {
    console.error('Error during database seeding:', error);
  } finally {
    await app.close();
  }
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
