import React from 'react';
import { injectIntl, FormattedDate, WrappedComponentProps } from 'react-intl';

interface Props extends WrappedComponentProps {
  date: Date | number;
}

const PublicFilterManager = (props: Props) => {
  const { date, intl } = props;
  return (
    <span title={intl.formatDate(date)}>
      <FormattedDate value={date} />
    </span>
  );
};

export default injectIntl(PublicFilterManager);
