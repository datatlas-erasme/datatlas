import { flattenMessages } from 'kepler.gl/dist/utils/locale-utils';
import { messages as keplerMessages } from 'kepler.gl/dist/localization';
import fr from './fr';
import en from './en';

export const messages = {
  fr: {
    ...keplerMessages.en,
    ...flattenMessages(fr),
  },
  en: {
    ...keplerMessages.en,
    ...flattenMessages(en),
  }
};

export { LOCALE_CODES, LOCALES } from './locales';
