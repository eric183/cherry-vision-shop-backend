import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigModule } from '@nestjs/config';
import { ChatGateway } from './event.gateway';
// const express = require('express');
// const app = express();
// const http = require('http').Server(app);
// const io = require('socket.io')(http);
// const port = process.env.PORT || 3000;

ConfigModule.forRoot({
  isGlobal: true,
});
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  // app.use(express.static(__dirname + '/public'));
  app.useWebSocketAdapter(new ChatGateway(app.getHttpServer()));

  await app.listen(process.env.PORT, '0.0.0.0', () => {
    console.log('Server Run Port', process.env.PORT);
  });
}
bootstrap();
