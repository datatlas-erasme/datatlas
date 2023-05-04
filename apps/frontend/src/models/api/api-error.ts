import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { ErrorResponse } from '@datatlas/dtos';

export type ApiError = FetchBaseQueryError & { data: ErrorResponse };
