interface IMaskProvider {
  date(_: Date): string;
  zipCode(_: string): string;
  remove(_: string): string;
  timestamp(_: Date): string;
}

export { IMaskProvider };
