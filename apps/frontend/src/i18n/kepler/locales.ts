import { LOCALES as KEPLER_LOCALES } from 'kepler.gl/dist/localization/locales';

export const LOCALES = {
  ...KEPLER_LOCALES,
  fr: 'Français',
};

export const LOCALE_CODES = Object.keys(LOCALES).reduce((acc, key) => ({ ...acc, [key]: key }), {});
