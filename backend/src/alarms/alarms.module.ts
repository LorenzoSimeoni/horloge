import { Module } from '@nestjs/common';
import { AlarmsService } from './services/alarms.service';
import { AlarmsController } from './controllers/alarms.controller';
import { Alarm, AlarmSchema } from './entities/alarm.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoAlarmRepository } from './repositories/mongo-alarm.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Alarm.name, schema: AlarmSchema }]),
  ],
  controllers: [AlarmsController],
  providers: [AlarmsService, MongoAlarmRepository],
})
export class AlarmsModule {}
