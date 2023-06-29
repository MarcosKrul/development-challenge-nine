interface IValidatorsProvider {
  email(email: string): boolean;
  length(str: string, length: number): boolean;
  zipCode(zipCode: string): boolean;
}

export { IValidatorsProvider };
