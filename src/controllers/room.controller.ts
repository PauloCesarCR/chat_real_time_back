import { Controller, Get, Post, Body, Response, BadRequestException, Param } from '@nestjs/common';
import { RoomsService } from 'src/services/room.service';

@Controller('room')
export class RoomsController {
    constructor(private readonly roomsService: RoomsService) { }

    @Get()
    async getRooms() {
        try {
            const rooms = await this.roomsService.getRooms()
            return rooms;
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }


}