import { Request, Response, NextFunction } from 'express';
import { BadRequestException, Injectable, NestMiddleware } from '@nestjs/common';
import * as  jwt from 'jsonwebtoken'
import { JwtPayload } from 'src/interfaces/jwtPayLoad';
import { PrismaClient } from '@prisma/client';
import User from 'src/entities/User';

export class Authentication implements NestMiddleware {

    readonly prisma = new PrismaClient()
    constructor() {
    }

    async use(req: Request, res: Response, next: NextFunction) {

        const { authorization } = req.headers;

        if (!authorization) {
            throw new BadRequestException("Informe o token")
        }
        try {
            const token = authorization.replace('Bearer ', "").trim()

            if (token.length <= 6) {
                throw new BadRequestException("Token inválido")
            }
            const { id } = jwt.verify(token, process.env.JWT_TOKEN) as JwtPayload;

            if (!id) {
                throw new BadRequestException("User inexistente")
            }
            this.prisma.$connect();
            const user = await this.prisma.users.findFirst({
                where: {
                    id: id
                }
            }).catch((e) => console.log(e)) as User;

            req.user = user;
            next()

        } catch (e) {
            throw new BadRequestException(e.message)
        }
    }

}