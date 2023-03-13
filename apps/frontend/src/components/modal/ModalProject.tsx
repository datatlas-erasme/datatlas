import React from 'react';
import { FormattedMessage } from 'react-intl';
import Modal from 'react-modal';
import styled from 'styled-components';
import { Input } from 'kepler.gl/dist/components/common/styled-components';
import { ModalTitle } from 'kepler.gl/dist/components/common/modal';
import { Delete } from 'kepler.gl/dist/components/common/icons';
import { StyledLabel } from '../forms';
import { StyledFormBtn } from '../buttons';

interface ModalProjectInterface {
  title: string | null;
  open: boolean;
  onClose: () => void;
}

const StyledModalContainer = styled(Modal)`
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

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    margin-bottom: 20px;
  }
  .closeBtn {
    position: absolute;
    top: 40px;
    right: 40px;
    z-index: ${({ theme }) => theme.modalButtonZ};
  }
  label {
    align-self: start;
  }
  form {
    display: flex;
    justify-content: space-around;
    align-items: center;
    min-width: 100%;
    ${Input} {
      width: 60%;
    }
  }
  ul {
    min-width: 100%;
    li {
      display: flex;
      justify-content: space-between;
      padding: 5px 0;
      border-bottom: solid 1px ${({ theme }) => theme.subtextColorLT};
      span {
        font-size: ${({ theme }) => theme.fontSize};
        font-weight: 700;
      }
    }
  }
`;

const ModalProject = ({ title, open, onClose }: ModalProjectInterface) => {
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
      <ModalContent
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <ModalTitle>{title}</ModalTitle>
        <button className={'closeBtn'} onClick={onClose}>
          <Delete />
        </button>
        <StyledLabel>
          <FormattedMessage defaultMessage={'Renommer le projet'} />:
        </StyledLabel>
        <form>
          <Input />
          <StyledFormBtn type="submit" value={'Renomer'} />
        </form>
        <StyledLabel>
          <FormattedMessage defaultMessage={'Participants au projet'} />:
        </StyledLabel>
        <form>
          <Input />
          <StyledFormBtn type="submit" value={'Inviter'} />
        </form>
        <ul>
          <li>
            <p>Anthony</p>
            <span>Proprietaire</span>
          </li>
          <li>
            <p>Marie</p>
            <span>Editrice</span>
          </li>
          <li>
            <p>Olivier</p>
            <span>Editeur</span>
          </li>
        </ul>
      </ModalContent>
    </StyledModalContainer>
  );
};

export default ModalProject;
