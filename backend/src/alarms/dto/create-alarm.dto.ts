import { DayOfWeek } from '../entities/days-of-week.entity';

export class CreateAlarmDto {
  name: string;
  duration?: number;
  time: Date;
  days?: DayOfWeek[];
  enabled: boolean;
}
