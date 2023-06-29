interface IDateProvider {
  now(): Date;
  getUTCDate(date: string, time?: string): Date;
  differenceInYears(left: Date, rigth: Date): number;
  isBefore(date: Date, toCompare: Date): boolean;
  isValidISOString(date: string): boolean;
}

export { IDateProvider };
