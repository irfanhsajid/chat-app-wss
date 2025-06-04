import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Chat } from './chat.entity';

@Entity('attachments')
export class Attachment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column({ nullable: true })
  entity_type: string;

  @Column()
  entity_id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  path: string;

  @Column({ nullable: true })
  state: string;

  @Column({ nullable: true })
  size: string;

  @Column({ nullable: true })
  expired_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  created_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  updated_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  deleted_at: Date;

  @ManyToOne(() => Chat)
  @JoinColumn({ name: 'entity_id' })
  chat: Chat;
}
