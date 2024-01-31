import { ErrorMessage } from '../ErrorMessage';
import React from 'react';

export const ServerErrorMessage = ({ error }) => {
  if (error?.message) {
    return <ErrorMessage>{error?.message}</ErrorMessage>;
  }

  return null;
};
