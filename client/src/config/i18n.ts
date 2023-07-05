import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import ptTranslation from '../../i18n_translations/pt-br.json';
import enTranslation from '../../i18n_translations/en.json';
import constants from '@global/constants';

const resources = {
  pt: { translation: ptTranslation },
  en: { translation: enTranslation },
};

const language = localStorage.getItem(constants.LOCALSTORAGE_LANGUAGE);

i18n.use(initReactI18next).init({
  resources,
  lng: language || 'pt-br',
  fallbackLng: language || 'pt-br',
  interpolation: { escapeValue: false },
});

export default i18n;
