import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

export const isFetchBaseQueryError = (
  error: FetchBaseQueryError | SerializedError | undefined
): error is FetchBaseQueryError => !!error && 'data' in error;
