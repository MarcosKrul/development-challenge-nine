import ptBR, {
  differenceInCalendarYears,
  isBefore,
  isValid,
  parseISO,
} from "date-fns";
import { zonedTimeToUtc } from "date-fns-tz";
import i18n from "i18n";
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

  differenceInMillis = (end: Date, start: Date): number =>
    end.getTime() - start.getTime();

  readableDate = (date: Date): string => {
    const rtf = new Intl.RelativeTimeFormat(i18n.getLocale(), {
      numeric: "auto",
    });

    const now = this.now();
    const differenceInSeconds = Math.abs(
      this.differenceInMillis(now, date) / 1000
    );

    if (differenceInSeconds < 3600) {
      const difference = Math.floor(differenceInSeconds / 60);
      return rtf.format(-difference, "minute");
    }

    if (differenceInSeconds < 3600 * 24) {
      const difference = Math.floor(differenceInSeconds / 3600);
      return rtf.format(-difference, "hour");
    }

    if (differenceInSeconds < 3600 * 24 * 7) {
      const difference = Math.floor(differenceInSeconds / (3600 * 24));
      return rtf.format(-difference, "day");
    }

    if (differenceInSeconds < 3600 * 24 * 7 * 4) {
      const difference = Math.floor(differenceInSeconds / (3600 * 24 * 7));
      return rtf.format(-difference, "week");
    }

    if (differenceInSeconds < 3600 * 24 * 7 * 4 * 12) {
      const endMonth = now.getMonth();
      const startMonth = date.getMonth();

      const difference =
        endMonth + (endMonth < startMonth ? 12 : 0) - startMonth;
      return rtf.format(-difference, "month");
    }

    const difference = now.getFullYear() - date.getFullYear();
    return rtf.format(-difference, "year");
  };
}

export { DateProvider };
