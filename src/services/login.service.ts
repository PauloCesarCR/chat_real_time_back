import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class loginService {
    prisma: PrismaClient

    constructor() {
        this.prisma = new PrismaClient()
        this.prisma.$connect()
    }


    async login(email: string, password: string) {

        try {
            if (!email || !password) {
                throw new Error("Todos os campos são obrigatórios")
            }
            const user = await this.prisma.users.findFirst({
                where: {
                    email: email
                }
            })
            if (!user) {
                throw new Error("User não existe")
            }

            if (!(await bcrypt.compare(password, user.password))) {
                throw new Error("Senha inválida")
            };

            const tk = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_TOKEN, {
                expiresIn: "3h",
            });

            return { id: user.id, name: user.name, email: user.email, token: tk };
        } catch (error) {
            throw new Error(error);
        }
    }

}
