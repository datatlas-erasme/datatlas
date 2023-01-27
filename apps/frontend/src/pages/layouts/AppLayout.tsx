import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUserId } from '../../store/selectors';

export const AppLayout = () => {
  const currentUserId = useSelector(selectCurrentUserId);
  if (!currentUserId) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};
