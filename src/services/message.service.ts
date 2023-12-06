import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client'
import Message from 'src/entities/Message';

@Injectable()
export class MessageService {
    prisma: PrismaClient

    constructor() {
        this.prisma = new PrismaClient()
        this.prisma.$connect()
    }


    async newMessage(message: Message) {

        try {
            const messages = await this.prisma.messages.create({
                data: {
                    user_origem_id: message.user_origem_id,
                    message: message.message,
                    date: message.date,
                    room_id: message.room_id
                }
            })

            return messages;

        } catch (error) {
            throw new Error(error);
        }
    }


    async getMessageForRoom(id_room: number) {
        try {
            const result = await this.prisma.messages.findMany({
                where: {
                    room_id: Number(id_room)
                },
                include: {
                    user_origem: {
                        select: {
                            name: true,
                        },
                    }
                },
            });
            return result;

        } catch (error) {
            throw new Error(error);
        }
    }
}
