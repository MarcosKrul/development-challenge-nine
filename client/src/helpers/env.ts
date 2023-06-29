const env = (key: string): string | undefined => {
  return import.meta.env[key];
};

export { env };
