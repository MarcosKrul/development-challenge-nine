import i18n from 'i18next';

const getMessage = (key: string): string => i18n.t(key);

export { getMessage };
