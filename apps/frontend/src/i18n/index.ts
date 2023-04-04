import { messages as keplerMessages } from 'kepler.gl/dist/localization';

import fr from './fr.json';
import en from './en.json';

export const messages = {
  fr,
  en: {
    ...keplerMessages.en,
    ...en,
  },
};

export const LOCALES = {
  en: 'English',
  fr: 'Français',
};

export const getDefaultLocale = () =>
  navigator.languages.map((locale) => locale.trim().split(/-|_/)[0])[0] || process.env.REACT_APP_DEFAULT_LOCALE || 'en';

export const LOCALE_CODES = Object.keys(LOCALES).reduce((acc, key) => ({ ...acc, [key]: key }), {});
