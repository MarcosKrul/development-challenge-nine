interface ILanguageOption {
  labelKey: string;
  value: string;
}

const languages: ILanguageOption[] = [
  {
    labelKey: 'LABEL_PT_BR',
    value: 'pt-br',
  },
  {
    labelKey: 'LABEL_EN',
    value: 'en',
  },
];

export { languages };
