import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Attachment } from './attachment.entity';
import { ChatGroup } from './chat-group.entity';
import { ChatSeen } from './chat-seen.entity';

@Entity('chats')
export class Chat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  chat_group_id: number;

  @Column({ nullable: true })
  message: string;

  @Column({ nullable: true })
  sender_type: string;

  @Column()
  sender_id: number;

  @Column({ nullable: true })
  created_at: Date;

  @Column({ nullable: true })
  updated_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  deleted_at: Date;

  @ManyToOne(() => ChatGroup, (chatGroup) => chatGroup.chats)
  @JoinColumn({ name: 'chat_group_id' })
  chatGroup: ChatGroup;

  @OneToMany(() => ChatSeen, (chatSeen) => chatSeen.chat)
  seenRecords: ChatSeen[];

  @OneToMany(() => Attachment, (attachment) => attachment.chat)
  attachments: Attachment[];
}
