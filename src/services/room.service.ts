import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client'

@Injectable()
export class RoomsService {
    prisma: PrismaClient

    constructor() {
        this.prisma = new PrismaClient()
        this.prisma.$connect()
    }


    async getRooms() {
        const rooms = await this.prisma.rooms.findMany();
        return rooms;
    }

}
