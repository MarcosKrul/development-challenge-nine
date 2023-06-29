import { validate } from "email-validator";
import { injectable } from "inversify";

import { IValidatorsProvider } from "../models/IValidatorsProvider";

@injectable()
class ValidatorsProvider implements IValidatorsProvider {
  email = (email: string): boolean => validate(email);

  length = (str: string, length: number): boolean => str.length <= length;
}

export { ValidatorsProvider };
