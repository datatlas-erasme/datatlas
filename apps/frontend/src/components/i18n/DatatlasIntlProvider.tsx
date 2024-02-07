/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { PropsWithChildren } from 'react';
import { IntlProvider } from 'react-intl';
import { useAppSelector } from '../../store/reducers';
import { selectLocale } from '../../store/selectors';
import { messages } from '../../i18n/messages';

export const DatatlasIntlProvider = ({ children }: PropsWithChildren) => {
  const locale = useAppSelector(selectLocale);

  return (
    // @ts-ignore
    <IntlProvider locale={locale} messages={messages[locale]}>
      {children}
    </IntlProvider>
  );
};
