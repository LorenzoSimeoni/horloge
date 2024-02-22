import { DayOfWeek } from "./DaysOfWeek";

export class Alarm {
  constructor(
    public _id: string,
    public name: string,
    public duration: number,
    public time: Date,
    public days: DayOfWeek[],
    public enabled: boolean
  ) {}
}
