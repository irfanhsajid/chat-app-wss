import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Chat } from './chat.entity';

@Entity('chat_seens')
export class ChatSeen {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  chat_id: number;

  @Column({ nullable: true, default: false })
  is_seen: boolean;

  @Column({ nullable: true })
  reaction: string;

  @Column({ type: 'timestamp', nullable: true })
  created_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  updated_at: Date;

  @ManyToOne(() => Chat, (chat) => chat.seenRecords)
  @JoinColumn({ name: 'chat_id' })
  chat: Chat;
}
