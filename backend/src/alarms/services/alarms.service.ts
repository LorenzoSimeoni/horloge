import { Injectable } from '@nestjs/common';
import { CreateAlarmDto } from '../dto/create-alarm.dto';
import { UpdateAlarmDto } from '../dto/update-alarm.dto';
import { MongoAlarmRepository } from '../repositories/mongo-alarm.repository';

@Injectable()
export class AlarmsService {
  constructor(private readonly alarmRepository: MongoAlarmRepository) {}

  create(createAlarmDto: CreateAlarmDto) {
    return this.alarmRepository.create(createAlarmDto);
  }

  findAll() {
    return this.alarmRepository.findAll();
  }

  findOne(id: string) {
    return this.alarmRepository.findOne(id);
  }

  update(id: string, updateAlarmDto: UpdateAlarmDto) {
    return this.alarmRepository.update(id, updateAlarmDto);
  }

  remove(id: string) {
    return this.alarmRepository.delete(id);
  }
}
