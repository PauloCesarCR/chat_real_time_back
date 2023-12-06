import { Controller, Get, Post, Body, Response, BadRequestException } from '@nestjs/common';
import User from 'src/entities/User';
import { loginService } from 'src/services/login.service';

@Controller('login')
export class LoginController {
    constructor(private readonly loginService: loginService) { }

    @Post()
    async login(@Body() info: { email: string, password: string }) {
        try {
            const userS = await this.loginService.login(info.email, info.password)
            return userS
        } catch (e) {
            throw new BadRequestException(e.message);
        }
    }


}
