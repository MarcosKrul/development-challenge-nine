interface IDateProvider {
  now(): Date;
  getUTCDate(date: string, time?: string): Date;
  differenceInYears(left: Date, rigth: Date): number;
}

export { IDateProvider };
