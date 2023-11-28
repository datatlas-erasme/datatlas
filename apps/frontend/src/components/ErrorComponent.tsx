import React from 'react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

export const ErrorComponent = ({ error }: { error: FetchBaseQueryError | SerializedError | Error }) => {
  return (
    <>
      {/*
// @ts-ignore */}
      <h1>Oops! {error.status}</h1>
      {/*
// @ts-ignore */}
      <p>{error.statusText}</p>
      <p>
        {/*
// @ts-ignore */}
        <i>{error.data.message}</i>
      </p>
    </>
  );
};
