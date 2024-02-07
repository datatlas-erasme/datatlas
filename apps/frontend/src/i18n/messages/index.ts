import { messages as keplerMessages } from '@kepler.gl/localization';
import en from './en';
import fr from './fr';

export const messages = {
  en: {
    ...keplerMessages.en,
    ...en,
  },
  fr: {
    ...keplerMessages.en,
    ...fr,
  },
};
