import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../../components/nav/Navbar';
import Footer from '../../components/footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsTokenExpired } from '../../store/selectors';
import { logout } from '../../store/reducers/user';

const LayoutStyle = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;
export const AppLayout = () => {
  const isTokenExpired = useSelector(selectIsTokenExpired);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  if (isTokenExpired) {
    dispatch(logout());
    navigate('/login');
  }

  return (
    <LayoutStyle>
      <Navbar />
      <Outlet />
      <Footer />
    </LayoutStyle>
  );
};
