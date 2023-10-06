import { useSelector } from 'react-redux';
import { skipToken } from '@reduxjs/toolkit/dist/query/react';
import { selectCurrentUserId } from '../store/selectors';
import { getUser } from '../store/api';

export function useFetchUser() {
  const currentUserId = useSelector(selectCurrentUserId);
  return getUser.useQuery(currentUserId ?? skipToken);
}
