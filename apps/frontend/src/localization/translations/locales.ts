import { LOCALES as KEPLER_LOCALES } from 'kepler.gl/dist/localization/locales';

export const LOCALES = {
  ...KEPLER_LOCALES,
  fr: 'Français',
};

/**
 * Localization can be passed to `KeplerGl` via uiState `locale`.
 * Available languages are `en` and `fi`. Default language is `en`
 * @constant
 * @public
 * @example
 * ```js
 * import {combineReducers} from 'redux';
 * import {LOCALE_CODES} from 'kepler.gl/localization/locales';
 *
 * const customizedKeplerGlReducer = keplerGlReducer
 *   .initialState({
 *     uiState: {
 *       // use Finnish locale
 *       locale: LOCALE_CODES.fi
 *     }
 *   });
 *
 * ```
 */

export const LOCALE_CODES = Object.keys(LOCALES).reduce((acc, key) => ({ ...acc, [key]: key }), {});
