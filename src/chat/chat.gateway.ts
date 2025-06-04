import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UserService } from '../user/user.service';
import { ChatService } from './chat.service';

interface MessagePayload {
  senderId: number;
  receiverId: number;
  content: string;
}

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: '/chat',
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  private userSocketMap: Map<number, string> = new Map();

  constructor(
    private chatService: ChatService,
    private userService: UserService,
  ) {}

  @SubscribeMessage('register')
  handleRegister(
    @MessageBody() userId: number,
    @ConnectedSocket() client: Socket,
  ) {
    console.log(`User ${userId} registered with socket ${client.id}`);
    this.userSocketMap.set(userId, client.id);
    return { status: 'registered' };
  }

  @SubscribeMessage('message')
  async handleMessage(
    @MessageBody() payload: MessagePayload,
    @ConnectedSocket() client: Socket,
  ) {
    console.log(
      `Message from ${payload.senderId} to ${payload.receiverId}: ${payload.content}`,
    );

    try {
      // Save message to database
      const message = await this.chatService.createMessage(
        payload.senderId,
        payload.receiverId,
        payload.content,
      );

      // Find receiver's socket if they're online
      const receiverSocketId = this.userSocketMap.get(payload.receiverId);

      // Emit the message to the specific receiver if online
      if (receiverSocketId) {
        this.server.to(receiverSocketId).emit('message', message);
      }

      // Also emit back to sender for confirmation
      client.emit('message', message);

      return { status: 'success', message };
    } catch (error: unknown) {
      console.error('Error sending message:', error);
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      client.emit('error', { message: 'Failed to send message' });
      return { status: 'error', message: errorMessage };
    }
  }

  @SubscribeMessage('getMessages')
  async getMessagesBetweenUsers(
    @MessageBody() { user1Id, user2Id }: { user1Id: number; user2Id: number },
  ) {
    try {
      const messages = await this.chatService.getMessagesBetweenUsers(
        user1Id,
        user2Id,
      );
      return { status: 'success', messages };
    } catch (error: unknown) {
      console.error('Error getting messages:', error);
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      return { status: 'error', message: errorMessage };
    }
  }
}
