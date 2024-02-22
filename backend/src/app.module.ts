import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlarmsModule } from './alarms/alarms.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/volta'),
    AlarmsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
