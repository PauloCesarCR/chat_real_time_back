import { Controller, Get, Post, Body, Response, BadRequestException, Param } from '@nestjs/common';
import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import Message from 'src/entities/Message';
import { MessageService } from 'src/services/message.service';

@Controller('message')
export class MessageController {
    constructor(private readonly messageService: MessageService) { }

    @Post()
    async newMessage(@Body() message: Message) {
        try {
            const messageSent = await this.messageService.newMessage(message)
            return messageSent;
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }

    @Get(':id')
    async getMessages(@Param('id') id_room: number) {
        try {
            const messagesRoom = await this.messageService.getMessageForRoom(id_room)
            return messagesRoom;
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }


}
