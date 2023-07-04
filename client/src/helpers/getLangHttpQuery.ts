import constants from '@global/constants';

const getLangHttpQuery = (): string =>
  `lang=${localStorage.getItem(constants.LOCALSTORAGE_LANGUAGE) || 'pt-br'}`;

export { getLangHttpQuery };
