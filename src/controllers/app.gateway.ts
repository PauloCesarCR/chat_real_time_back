import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer() server: Server;

    handleConnection(client: Socket, ...args: any[]) {
        console.log(`Client connected: ${client.id}`);
    }

    handleDisconnect(client: Socket) {
        console.log(`Client disconnected: ${client.id}`);
    }

    @SubscribeMessage('joinRoom')
    handleJoinRoom(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
        client.join(data[0].room)
        this.server.to(data[0].room).emit('message', data[1], client.id)
        console.log(`Client ${client.id} joined room ${data[0].room}`);
    }

    @SubscribeMessage('leaveRoom')
    handleLeaveRoom(@MessageBody() data: { room: string }, @ConnectedSocket() client: Socket) {
        client.leave(data.room);
        console.log(`Client ${client.id} left room ${data.room}`);
    }


}