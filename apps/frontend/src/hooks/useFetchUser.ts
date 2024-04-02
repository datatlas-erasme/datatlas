import { skipToken } from '@reduxjs/toolkit/query/react';
import { useAppSelector } from '../store/reducers';
import { selectCurrentUserId } from '../store/selectors';
import { getUser } from '../store/api';

export function useFetchUser() {
  const currentUserId = useAppSelector(selectCurrentUserId);
  return getUser.useQuery(currentUserId ?? skipToken);
}
