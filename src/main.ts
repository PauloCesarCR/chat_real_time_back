import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';
import * as socketio from 'socket.io';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: "*"
  })
  const httpServer = app.getHttpServer();
  const io = new socketio.Server(httpServer, {
    cors: {
      origin: "*",
    }
  });

  app.useWebSocketAdapter(new IoAdapter(app));

  await app.listen(3000);
}

bootstrap();