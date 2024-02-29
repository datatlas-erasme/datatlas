import React, { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { selectCurrentUserId } from '../../store/selectors';
import { useAppSelector } from '../../store/reducers';
import { getUser } from '../../store/api';
import { Loader } from '../Loader';

export const AuthenticatedGuard = ({ children }: PropsWithChildren) => {
  const currentUserId = useAppSelector(selectCurrentUserId);
  if (!currentUserId) {
    return <Navigate to="/login" />;
  }

  const { isLoading, isFetching } = getUser.useQuery(currentUserId, {
    skip: false,
    refetchOnMountOrArgChange: true,
  });

  if (isLoading || isFetching) {
    return <Loader />;
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
};
