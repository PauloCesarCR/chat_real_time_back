import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { Authentication } from './middleware/auth';
import { LoginController } from './controllers/login.controller';
import { loginService } from './services/login.service';
import { AppGateway } from './controllers/app.gateway';
import { MessageController } from './controllers/message.controller';
import { MessageService } from './services/message.service';
import { RoomsController } from './controllers/room.controller';
import { RoomsService } from './services/room.service';
@Module({
  imports: [],
  controllers: [AppController, LoginController, MessageController, RoomsController],
  providers: [AppService, loginService, AppGateway, MessageService, RoomsService],
})
export class AppModule { }
