import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { ChatGroup } from './chat-group.entity';

@Entity('chat_group_members')
export class ChatGroupMember {
  @PrimaryColumn()
  chat_group_id: number;

  @PrimaryColumn()
  user_id: number;

  @ManyToOne(() => ChatGroup, (chatGroup) => chatGroup.members)
  @JoinColumn({ name: 'chat_group_id' })
  chatGroup: ChatGroup;
}
