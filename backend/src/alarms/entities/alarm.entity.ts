import { HydratedDocument } from 'mongoose';
import { DayOfWeek } from './days-of-week.entity';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type AlarmDocument = HydratedDocument<Alarm>;

@Schema()
export class Alarm {
  @Prop({ default: 'alarm' })
  name: string;

  @Prop({ default: 5 })
  duration: number;

  @Prop({ required: true })
  time: Date;

  @Prop()
  days: DayOfWeek[];

  @Prop({ default: true })
  enabled: boolean;
}

export const AlarmSchema = SchemaFactory.createForClass(Alarm);
