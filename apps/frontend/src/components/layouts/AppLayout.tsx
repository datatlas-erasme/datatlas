import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { skipToken } from '@reduxjs/toolkit/dist/query/react';
import Navbar from '../../components/nav/Navbar';
import Footer from '../../components/footer/Footer';
import { selectCurrentUserId } from '../../store/selectors';
import { getUser } from '../../store/api';
import { useOutletContext } from 'react-router';

const LayoutStyle = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export type ContextType = {
  projectModalOpen: boolean;
  setProjectModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AppLayout = () => {
  const currentUserId = useSelector(selectCurrentUserId);
  const { data: user, isError: isUserError, error: userError } = getUser.useQuery(currentUserId ?? skipToken);
  if (isUserError) {
    console.error(userError);
  }
  const [projectModalOpen, setProjectModalOpen] = useState<boolean>(false);
  const context = { projectModalOpen, setProjectModalOpen } satisfies ContextType;

  if (!currentUserId && !user) {
    return <Outlet context={context} />;
  }

  return (
    <LayoutStyle>
      <Navbar handleClickContributors={() => setProjectModalOpen(true)} />
      <Outlet context={context} />
      <Footer />
    </LayoutStyle>
  );
};

export function useProjectModalState() {
  return useOutletContext<ContextType>();
}
