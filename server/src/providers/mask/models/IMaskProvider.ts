interface IMaskProvider {
  date(_: Date): string;
  zipCode(_: string): string;
}

export { IMaskProvider };
