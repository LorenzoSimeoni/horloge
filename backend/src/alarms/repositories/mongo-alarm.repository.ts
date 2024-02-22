import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAlarmDto } from 'src/alarms/dto/create-alarm.dto';
import { UpdateAlarmDto } from 'src/alarms/dto/update-alarm.dto';
import { Alarm } from 'src/alarms/entities/alarm.entity';

@Injectable()
export class MongoAlarmRepository {
  constructor(
    @InjectModel(Alarm.name) private readonly alarmModel: Model<Alarm>,
  ) {}

  async create(createAlarmDto: CreateAlarmDto): Promise<Alarm> {
    const createdCat = await this.alarmModel.create(createAlarmDto);
    return createdCat;
  }

  async findAll(): Promise<Alarm[]> {
    return this.alarmModel.find().exec();
  }

  async findOne(id: string): Promise<Alarm> {
    return this.alarmModel.findOne({ _id: id }).exec();
  }

  async delete(id: string): Promise<Alarm> {
    const deletedAlarm = await this.alarmModel.findByIdAndDelete(id).exec();
    return deletedAlarm;
  }

  async update(id: string, updateAlarmDto: UpdateAlarmDto): Promise<Alarm> {
    const updatedAlarm = await this.alarmModel
      .findByIdAndUpdate(id, updateAlarmDto)
      .exec();
    return updatedAlarm;
  }
}
