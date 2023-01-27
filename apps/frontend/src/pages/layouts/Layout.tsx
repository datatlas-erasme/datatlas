import React, { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUserId } from '../../store/selectors';

export type LayoutProps = PropsWithChildren<object>;

export const Layout = ({ children }: LayoutProps) => {
  const currentUserId = useSelector(selectCurrentUserId);
  if (currentUserId) {
    return <Navigate to="/" />;
  }

  return <div>{children}</div>;
};
