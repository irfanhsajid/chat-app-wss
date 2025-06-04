import * as bcrypt from 'bcrypt';
import { DataSource } from 'typeorm';
import { User } from '../../user/entities/user.entity';

export class UserSeeder {
  constructor(private dataSource: DataSource) {}

  async run(): Promise<void> {
    const userRepository = this.dataSource.getRepository(User);

    // Check if users already exist
    const userCount = await userRepository.count();
    if (userCount > 0) {
      console.log('Users already seeded, skipping...');
      return;
    }

    const users = [
      {
        username: 'user1',
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        password: await bcrypt.hash('password1', 10),
      },
      {
        username: 'user2',
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        password: await bcrypt.hash('password2', 10),
      },
    ];

    await userRepository.save(users);
    console.log('Users seeded successfully');
  }
}
