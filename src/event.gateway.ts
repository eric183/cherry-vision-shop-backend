import { IoAdapter } from '@nestjs/platform-socket.io';
import * as http from 'http';
import { Socket, Server } from 'socket.io';

export class ChatGateway extends IoAdapter {
  protected ioServer: Server;
  constructor(protected server: http.Server) {
    super();
    this.ioServer = new Server(server);

    this.ioServer.on('connection', (socket: Socket) => {
      console.log(socket, '.....');
      socket.emit('connected', '!!!');
    });
  }

  create(port: number) {
    console.log(
      'websocket gateway port argument is ignored by ExtendedSocketIoAdapter, use the same port of http instead',
    );
    return this.ioServer;
  }
}

// import {
//   ConnectedSocket,
//   MessageBody,
//   OnGatewayConnection,
//   OnGatewayDisconnect,
//   OnGatewayInit,
//   SubscribeMessage,
//   WebSocketGateway,
//   WebSocketServer,
// } from '@nestjs/websockets';

// import { Injectable, Logger } from '@nestjs/common';

// import { Socket, Server } from 'socket.io';

// type T2UserType = {
//   id: string;
//   message: string;
// };

// interface IRequest {
//   fromUser: T2UserType;
//   toUser: T2UserType;
//   message: string;
// }

// @Injectable()
// // @WebSocketGateway(Number(process.env.SOCKET_PORT), { cors: true })
// @WebSocketGateway(8888, { transports: ['websocket'], cors: true })
// export class ChatGateway
//   implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
// {
//   @WebSocketServer()
//   server: Server;

//   toUser: T2UserType = {
//     id: '',
//     message: '',
//   };

//   private readonly logger = new Logger(ChatGateway.name);

//   constructor() {
//     console.log('');
//   }

//   async afterInit() {
//     this.logger.verbose('Socket Initialized!!!!');
//   }

//   async handleConnection(client: Socket) {
//     // set Socket to the specified user
//     console.log('connected');
//     const userId = client.handshake.query.userId as string;
//   }

//   async handleDisconnect(
//     @MessageBody()
//     { fromUser, toUser }: IRequest,
//   ) {
//     // this.chatService.leaveChat(fromUser.id, this.toUser.id);
//   }
// }
