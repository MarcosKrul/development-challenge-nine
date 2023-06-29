import { injectable } from "inversify";

import { IMaskProvider } from "../models/IMaskProvider";

@injectable()
class MaskProvider implements IMaskProvider {
  date = (date: Date): string =>
    date.toISOString().split("T")[0].split("-").reverse().join("/");

  zipCode = (zipCode: string): string =>
    zipCode.replace(/[^\d]/g, "").replace(/(\d{5})(\d{3})/, "$1-$2");

  remove = (value: string): string => value.replace(/[^0-9]+/g, "");
}

export { MaskProvider };
