import React from 'react';
import { ModalFooter } from 'kepler.gl/dist/components/common/modal';
import { ModalContent, StyledModalContainer } from './StyledModal';
import { CloseButton } from '../buttons';

interface SavedModalInterface {
  title: string | null;
  open: boolean;
  onClose: () => void;
}

export const SavedModal = ({ title, open, onClose }: SavedModalInterface) => {
  return (
    <StyledModalContainer
      isOpen={open}
      onRequestClose={onClose}
      ariaHideApp={false}
      style={{
        overlay: {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(7, 104, 159, 0.85)',
          zIndex: 101,
        },
      }}
    >
      <h2>{title}</h2>
      <CloseButton onClose={onClose} />
      <ModalContent>
        Vous avez effectué des modifications sur la carte. Souhaitez-vous sauvegarder ces modifications ?
      </ModalContent>
      <ModalFooter cancel={'Annuler'} cancelButton={'Cancel'} confirmButton={'Envoyer'} />
    </StyledModalContainer>
  );
};
