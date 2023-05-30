import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ChatGateway } from './event.gateway';

@Module({
  // imports: [DatabaseModule],
  controllers: [AppController],
  providers: [AppService, ChatGateway],
})
export class AppModule {}
