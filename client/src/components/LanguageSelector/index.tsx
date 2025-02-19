import React, { useEffect, useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { useTranslation } from 'react-i18next';
import constants from '@global/constants';
import { languages } from '@global/languages';
import { StyledSelect } from './styles';
import colors from '@global/colors';

const LanguageSelector = () => {
  const { i18n, t } = useTranslation();
  const [language, setLanguage] = useState('pt-br');

  useEffect(() => {
    const language = localStorage.getItem(constants.LOCALSTORAGE_LANGUAGE);
    if (language) setLanguage(language);
  });

  const handleChange = (value: string) => {
    setLanguage(value);
    i18n.changeLanguage(value);
    localStorage.setItem(constants.LOCALSTORAGE_LANGUAGE, value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 80 }} size="small">
      <InputLabel
        id="language-selector-label-id"
        style={{ color: colors.GREY_DARKER }}
      >
        {t('LABEL_LANGUAGE')}
      </InputLabel>
      <StyledSelect
        sx={{
          '.MuiSvgIcon-root ': {
            fill: colors.GREY_DARKER,
          },
        }}
        labelId="language-selector-label-id"
        id="language-selector-id"
        value={language}
        onChange={(e) => handleChange(e.target.value)}
        label={t('LABEL_LANGUAGE')}
      >
        {languages.map(({ value, labelKey }, index) => (
          <MenuItem key={index} value={value}>
            {t(labelKey)}
          </MenuItem>
        ))}
      </StyledSelect>
    </FormControl>
  );
};

export { LanguageSelector };
