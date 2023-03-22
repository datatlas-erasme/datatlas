import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';

export type ModalProps = PropsWithChildren<object>;

interface ModalWrapperInterface {
  children?: ModalProps;
  title: string | null;
  open: boolean;
  onClose: () => void;
}

export const StyledModalContainer = styled(Modal)`
  display: flex;
  flex-direction: column;
  align-content: center;
  position: absolute;
  left: 50%;
  top: 50%;
  max-width: 600px;
  width: 100%;
  padding: 40px;
  transform: translate(-50%, -50%);
  box-shadow: ${({ theme }) => theme.boxShadow};
  border-radius: ${({ theme }) => theme.borderRadius};
  background-color: ${({ theme }) => theme.navBackgroundColor};
  transition: ${({ theme }) => theme.transitionSlow};
  z-index: ${({ theme }) => theme.modalContentZ};
`;

export const ModalWrapper = ({ children, open, onClose, title }: ModalWrapperInterface) => {
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
      {children}
    </StyledModalContainer>
  );
};
