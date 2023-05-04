import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectCurrentUserId } from '../../store/selectors';
import Navbar from '../../components/nav/Navbar';
import Footer from '../../components/footer/Footer';
import { getUser } from '../../store/api';
import { Loader } from '../../components/Loader';

const LayoutStyle = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;
export const AppLayout = () => {
  const currentUserId = useSelector(selectCurrentUserId);
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

  return (
    <LayoutStyle>
      <Navbar />
      <Outlet />
      <Footer />
    </LayoutStyle>
  );
};
