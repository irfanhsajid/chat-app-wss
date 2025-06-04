import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ChatGroupMember } from './chat-group-member.entity';
import { Chat } from './chat.entity';

export enum ChatGroupType {
  DIRECT = 'direct',
  GROUP = 'group',
}

@Entity('chat_groups')
export class ChatGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  sid: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({
    type: 'enum',
    enum: ChatGroupType,
    default: ChatGroupType.DIRECT,
  })
  type: ChatGroupType;

  @Column({ type: 'timestamp', nullable: true })
  created_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  updated_at: Date;

  @Column({ type: 'timestamp', nullable: true })
  deleted_at: Date;

  @OneToMany(() => Chat, (chat) => chat.chatGroup)
  chats: Chat[];

  @OneToMany(() => ChatGroupMember, (member) => member.chatGroup)
  members: ChatGroupMember[];
}
