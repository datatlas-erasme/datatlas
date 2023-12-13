import React, { useEffect } from 'react';
import { css } from 'styled-components';
import { LoadingProjectInterface } from '@datatlas/models';
import document from 'global/document';
import KeyEvent from 'kepler.gl/dist/constants/keyevent';
import { StyledModal } from '../Modal';
import { InviteContributorsForm } from '../forms/InviteContributorsForm';
import { useGetUsersQuery } from '../../store/api';

const updateProjectModalCss = css`
  width: 40%;
  padding: 40px 40px 32px 40px;
  height: 45vh;
`;

interface UpdateProjectModalProps {
  project: LoadingProjectInterface;
  open?: boolean;
  setOpen: (open: boolean) => void;
}

export const UpdateProjectModal = ({ project, open, setOpen }: UpdateProjectModalProps) => {
  useEffect(() => {
    const onKeyUp = (e: KeyEvent) => {
      const keyCode = e.keyCode;
      if (keyCode === KeyEvent.DOM_VK_ESCAPE) {
        setOpen(false);
      }
    };

    document.addEventListener('keyup', onKeyUp);

    return () => {
      document.removeEventListener('keyup', onKeyUp);
    };
  }, [setOpen]);

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
