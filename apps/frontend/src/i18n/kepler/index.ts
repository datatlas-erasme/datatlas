import { flattenMessages } from 'kepler.gl/dist/utils/locale-utils';
import { messages as keplerMessages } from 'kepler.gl/dist/localization';
import { isObject } from 'kepler.gl/dist/utils/utils';
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
  },
};

export const mergeMessages = (defaultMessages, userMessages) => {
  if (!isObject(userMessages) || !isObject(userMessages.en)) {
    console.error(
      'message should be an object and contain at least the `en` translation. Read more at https://docs.kepler.gl/docs/api-reference/localization'
    );

    return defaultMessages;
  }

  const userEnFlat = flattenMessages(userMessages.en);
  const localeKeys = Object.keys(defaultMessages)
    .concat(Object.keys(userMessages))
    .filter((value, index, array) => array.indexOf(value) === index);
  return localeKeys.reduce(
    (acc, key) => ({
      ...acc,
      [key]:
        key === 'en'
          ? { ...defaultMessages.en, ...userEnFlat }
          : { ...defaultMessages[key], ...userEnFlat, ...flattenMessages(userMessages[key] || {}) },
    }),
    {}
  );
};

export { LOCALE_CODES, LOCALES } from './locales';
