import ptBR, {
  differenceInCalendarYears,
  isBefore,
  isValid,
  parseISO,
} from "date-fns";
import { zonedTimeToUtc } from "date-fns-tz";
import { injectable } from "inversify";

import { IDateProvider } from "../../models/IDateProvider";

@injectable()
class DateProvider implements IDateProvider {
  getUTCDate = (date: string, time?: string): Date =>
    zonedTimeToUtc(
      new Date(`${date}${time ? ` ${time}:00.000Z` : ""}`),
      "America/Sao_Paulo",
      { locale: ptBR }
    );

  now = (): Date => zonedTimeToUtc(new Date().toISOString(), "");

  differenceInYears = (left: Date, rigth: Date): number =>
    differenceInCalendarYears(left, rigth);

  isBefore = (date: Date, toCompare: Date): boolean =>
    isBefore(date, toCompare);

  isValidISOString = (date: string): boolean => isValid(parseISO(date));
}

export { DateProvider };
