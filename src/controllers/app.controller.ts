import { Controller, Get, Post, Body, Param, Response, BadRequestException, Request } from '@nestjs/common';
import { AppService } from '../services/app.service';
import User from 'src/entities/User';
import Error from 'src/entities/Error';


@Controller('users')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Post()
  async newUser(@Body() user: User): Promise<User | Error> {
    try {
      const userS = await this.appService.newUser(user)
      return userS
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

}
