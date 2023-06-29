import { validate } from "email-validator";
import { injectable } from "inversify";

import { IValidatorsProvider } from "../models/IValidatorsProvider";

@injectable()
class ValidatorsProvider implements IValidatorsProvider {
  email = (email: string): boolean => validate(email);

  length = (str: string, length: number): boolean => str.length <= length;

  zipCode = (zipCode: string): boolean =>
    /^[0-9]{5}(?:-)[0-9]{3}/.test(zipCode);
}

export { ValidatorsProvider };
