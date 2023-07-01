import { injectable } from "inversify";

import { getMessage } from "@helpers/translatedMessagesControl";

import { IMaskProvider } from "../models/IMaskProvider";

@injectable()
class MaskProvider implements IMaskProvider {
  date = (date: Date): string =>
    date.toISOString().split("T")[0].split("-").reverse().join("/");

  zipCode = (zipCode: string): string =>
    zipCode.replace(/[^\d]/g, "").replace(/(\d{5})(\d{3})/, "$1-$2");

  remove = (value: string): string => value.replace(/[^0-9]+/g, "");

  timestamp = (date: Date): string =>
    date
      .toISOString()
      .replace(
        /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}).*$/,
        `$3/$2/$1 ${getMessage("RandomWord_TimestampLink")} $4:$5`
      );
}

export { MaskProvider };
