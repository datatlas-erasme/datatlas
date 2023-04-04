/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { PropsWithChildren } from 'react';
import { IntlProvider } from 'react-intl';
import { useSelector } from 'react-redux';
import { selectLocale } from '../../store/selectors';
import { messages } from '../../i18n';

export const DatatlasIntlProvider = ({ children }: PropsWithChildren) => {
  const locale = useSelector(selectLocale);

  return (
    // @ts-ignore
    <IntlProvider locale={locale} messages={messages[locale]}>
      {children}
    </IntlProvider>
  );
};
