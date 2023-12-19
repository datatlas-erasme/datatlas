import React from 'react';
import { css } from 'styled-components';
import { LoadingProjectInterface, ProjectInterface } from '@datatlas/models';
import KeyEvent from 'kepler.gl/dist/constants/keyevent';
import { StyledModal } from './Modal';
import { useOnKeyEffect } from '../hooks/useOnKeyEffect';

const smallModalCss = css`
  width: 40%;
  padding: 40px 40px 32px 40px;
`;

interface DeleteProjectModalProps {
  project: LoadingProjectInterface | null;
  onDelete: (id: ProjectInterface['id']) => void;
  setDeletingProject: (project: LoadingProjectInterface | null) => void;
}

export const DeleteProjectModal = ({ project, onDelete, setDeletingProject }: DeleteProjectModalProps) => {
  useOnKeyEffect<typeof project>(KeyEvent.DOM_VK_ESCAPE, setDeletingProject, null);

  const handleCloseModal = () => {
    setDeletingProject(null);
  };

  const modalProps = {
    title: 'modal.title.deleteProject',
    cssStyle: smallModalCss,
    footer: true,
    onConfirm: () => {
      if (project) {
        onDelete(project.id);
        handleCloseModal();
      }
    },
    onCancel: handleCloseModal,
    confirmButton: {
      negative: true,
      large: true,
      children: 'modal.button.delete',
    },
  };

  return <StyledModal {...modalProps} isOpen={!!project} />;
};
