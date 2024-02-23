export enum DayOfWeek {
  Monday = "Monday",
  Tuesday = "Tuesday",
  Wednesday = "Wednesday",
  Thursday = "Thursday",
  Friday = "Friday",
  Saturday = "Saturday",
  Sunday = "Sunday",
}

export enum DayNumber {
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
  Sunday = 7,
}

export function convertDayOfWeekToNumber(
  dayOfWeek: DayOfWeek
): DayNumber | null {
  switch (dayOfWeek) {
    case DayOfWeek.Monday:
      return DayNumber.Monday;
    case DayOfWeek.Tuesday:
      return DayNumber.Tuesday;
    case DayOfWeek.Wednesday:
      return DayNumber.Wednesday;
    case DayOfWeek.Thursday:
      return DayNumber.Thursday;
    case DayOfWeek.Friday:
      return DayNumber.Friday;
    case DayOfWeek.Saturday:
      return DayNumber.Saturday;
    case DayOfWeek.Sunday:
      return DayNumber.Sunday;
    default:
      return null;
  }
}

export function convertDayNumberToDayOfWeek(
  dayNumber: DayNumber
): DayOfWeek | null {
  switch (dayNumber) {
    case DayNumber.Monday:
      return DayOfWeek.Monday;
    case DayNumber.Tuesday:
      return DayOfWeek.Tuesday;
    case DayNumber.Wednesday:
      return DayOfWeek.Wednesday;
    case DayNumber.Thursday:
      return DayOfWeek.Thursday;
    case DayNumber.Friday:
      return DayOfWeek.Friday;
    case DayNumber.Saturday:
      return DayOfWeek.Saturday;
    case DayNumber.Sunday:
      return DayOfWeek.Sunday;
    default:
      return null;
  }
}

export function convertNumberToDayNumber(number: number): DayNumber | null {
  switch (number) {
    case 1:
      return DayNumber.Monday;
    case 2:
      return DayNumber.Tuesday;
    case 3:
      return DayNumber.Wednesday;
    case 4:
      return DayNumber.Thursday;
    case 5:
      return DayNumber.Friday;
    case 6:
      return DayNumber.Saturday;
    case 7:
      return DayNumber.Sunday;
    default:
      return null;
  }
}
