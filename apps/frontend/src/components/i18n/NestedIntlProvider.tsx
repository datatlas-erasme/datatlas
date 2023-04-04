/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { PropsWithChildren, useMemo } from 'react';
import { IntlConfig, IntlProvider, useIntl } from 'react-intl';

type NestedIntlProviderPropsInterface = Pick<IntlConfig, 'locale' | 'messages' | 'defaultLocale'> & PropsWithChildren;

export default function NestedIntlProvider({
  messages,
  children,
  locale,
  defaultLocale,
}: NestedIntlProviderPropsInterface): React.ReactElement {
  const intl = useIntl();
  const mergedMessages = useMemo(() => {
    return { ...intl.messages, ...messages };
  }, [intl, messages]);
  return (
    // @ts-ignore
    <IntlProvider locale={locale} defaultLocale={defaultLocale} messages={mergedMessages}>
      {children}
    </IntlProvider>
  );
}
