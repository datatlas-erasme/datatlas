import React from 'react';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import { ErrorComponent } from '../components/ErrorComponent';

export const ErrorPage = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div id="error-page">
        <ErrorComponent error={error} />
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div id="error-page">
        <h1>Oops! Unexpected Error</h1>
        <p>Something went wrong.</p>
        <p>
          <i>{error.message}</i>
        </p>
      </div>
    );
  } else {
    return (
      <div id="error-page">
        <p>
          <h1>Oops! </h1>
          <i>This definitely shouldn't happend</i>
        </p>
      </div>
    );
  }
};
