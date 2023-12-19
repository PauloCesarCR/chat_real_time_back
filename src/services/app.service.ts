import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client'
import User from 'src/entities/User';
import Error from 'src/entities/Error';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AppService {
  prisma: PrismaClient

  constructor() {
    this.prisma = new PrismaClient()
  }

  async newUser(user: User): Promise<User | Error> {

    this.prisma.$connect()
    try {
      const userS = await this.prisma.users.create({
        data: {
          name: user.name,
          email: user.email,
          password: await bcrypt.hash(user.password, 10),
        }
      })
      this.prisma.$disconnect()
      return userS;

    } catch (e) {
      if (e instanceof Prisma.PrismaClientValidationError) {
        throw new Error("Campos inválidos")
      }
      throw e;
    }
  }
}
