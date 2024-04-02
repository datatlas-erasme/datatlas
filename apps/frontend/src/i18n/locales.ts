//  We may choose to import other Kepler locales and make them available :
//  import { LOCALES as KEPLER_LOCALES } from '@kepler.gl/localization';

export const LOCALES = {
  en: 'English',
  fr: 'Français',
};

export const LOCALE_CODES = Object.keys(LOCALES).reduce((acc, key) => ({ ...acc, [key]: key }), {});
