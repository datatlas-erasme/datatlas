import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { skipToken } from '@reduxjs/toolkit/dist/query/react';
import Navbar from '../../components/nav/Navbar';
import Footer from '../../components/footer/Footer';
import { selectCurrentUserId } from '../../store/selectors';
import { getUser } from '../../store/api';

const LayoutStyle = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const AppLayout = () => {
  const currentUserId = useSelector(selectCurrentUserId);
  const { data: user, isError: isUserError, error: userError } = getUser.useQuery(currentUserId ?? skipToken);
  if (isUserError) {
    console.error(userError);
  }

  if (!currentUserId && !user) {
    return <Outlet />;
  }

  return (
    <LayoutStyle>
      <Navbar />
      <Outlet />
      <Footer />
    </LayoutStyle>
  );
};
