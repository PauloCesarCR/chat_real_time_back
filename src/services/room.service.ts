import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client'

@Injectable()
export class RoomsService {
    prisma: PrismaClient

    constructor() {
        this.prisma = new PrismaClient()
    }


    async getRooms() {

        this.prisma.$connect()
        const rooms = await this.prisma.rooms.findMany();

        this.prisma.$disconnect()
        return rooms;
    }

}
