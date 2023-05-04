import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { ApiError } from '../models';

export const isFetchBaseQueryError = (
  error: FetchBaseQueryError | SerializedError | undefined
): error is FetchBaseQueryError => !!error && 'data' in error;

export const isApiError = (error: FetchBaseQueryError | SerializedError | ApiError | undefined): error is ApiError =>
  !!error && 'data' in error && typeof error.data === 'object';
