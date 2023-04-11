import { isObject } from 'kepler.gl/dist/utils/utils';
import { flattenMessages } from 'kepler.gl/dist/utils/locale-utils';

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

export const getDefaultLocale = () =>
  navigator.languages.map((locale) => locale.trim().split(/-|_/)[0])[0] || process.env.REACT_APP_DEFAULT_LOCALE || 'en';
