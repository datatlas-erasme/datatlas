import React from 'react';
import { FormattedMessage as ReactIntlFormattedMessage } from 'react-intl';

export const FormattedMessage = (props) => (
  <ReactIntlFormattedMessage
    id={props.id}
    // Use id as default message to prevent extraction errors.
    defaultMessage={props.defaultMessage || props.id}
    {...props}
  />
);
