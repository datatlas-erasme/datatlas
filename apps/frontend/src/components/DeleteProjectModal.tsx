import React, { useEffect } from 'react';
import { css } from 'styled-components';
import { LoadingProjectInterface, ProjectInterface } from '@datatlas/models';
import document from 'global/document';
import KeyEvent from 'kepler.gl/dist/constants/keyevent';
import { StyledModal } from './Modal';

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
  useEffect(() => {
    const onKeyUp = (e: KeyEvent) => {
      const keyCode = e.keyCode;
      if (keyCode === KeyEvent.DOM_VK_ESCAPE) {
        setDeletingProject(null);
      }
    };

    document.addEventListener('keyup', onKeyUp);

    return () => {
      document.removeEventListener('keyup', onKeyUp);
    };
  }, [setDeletingProject]);

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
