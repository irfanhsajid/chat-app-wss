import { DataSource } from 'typeorm';
import { UserSeeder } from './user.seeder';

export class MainSeeder {
  constructor(private dataSource: DataSource) {}

  async run(): Promise<void> {
    // Run seeders in order
    await new UserSeeder(this.dataSource).run();

    console.log('All seeders completed successfully');
  }
}
