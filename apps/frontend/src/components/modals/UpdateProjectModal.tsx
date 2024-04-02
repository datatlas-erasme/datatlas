import React from 'react';
import { css } from 'styled-components';
import { LoadingProjectInterface } from '@datatlas/models';
import { KeyEvent } from '@kepler.gl/constants';
import { StyledModal } from '../Modal';
import { InviteContributorsForm } from '../forms/InviteContributorsForm';
import { useGetUsersQuery } from '../../store/api';
import { useOnKeyEffect } from '../../hooks/useOnKeyEffect';

const updateProjectModalCss = css`
  width: 33vw;
  padding: 40px 40px 32px 40px;
  height: 66vh;
`;

interface UpdateProjectModalProps {
  project: LoadingProjectInterface;
  open?: boolean;
  setOpen: (open: boolean) => void;
}

export const UpdateProjectModal = ({ project, open, setOpen }: UpdateProjectModalProps) => {
  useOnKeyEffect<boolean>(KeyEvent.DOM_VK_ESCAPE, setOpen, false);

  const handleCloseModal = () => {
    setOpen(false);
  };

  const modalProps = {
    title: 'modal.title.updateProject',
    cssStyle: updateProjectModalCss,
    footer: false,
    onCancel: handleCloseModal,
  };

  const { data: users } = useGetUsersQuery();

  return (
    <StyledModal {...modalProps} isOpen={!!open}>
      <InviteContributorsForm owner={project?.owner} contributors={project.contributors} users={users || []} />
    </StyledModal>
  );
};
