export class Duration {
  private _days: number;

  public get minutes(): number {
    return this._minutes;
  }
  public set minutes(value: number) {
    this._minutes = value;
  }
  public get hours(): number {
    return this._hours;
  }
  public set hours(value: number) {
    this._hours = value;
  }
  public get days(): number {
    return this._days;
  }
  public set days(value: number) {
    this._days = value;
  }

  constructor(private _hours: number, private _minutes: number) {
    let compteurDay = 0;
    if (_hours >= 24) {
      while (_hours >= 24) {
        _hours = _hours - 24;
        compteurDay += 1;
      }
    }
    this._days = compteurDay;
    this.hours = _hours;
    this.minutes = _minutes;
  }
}
