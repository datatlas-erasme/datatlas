import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Input } from 'kepler.gl/dist/components/common/styled-components';
import styled from 'styled-components';
import { FormBtn } from '../../style/components';
import { Delete } from 'kepler.gl/dist/components/common/icons';

interface ModalProjectInterface {
  title: string | null;
  open: boolean;
  onClose: () => void;
}

const StyledModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  max-width: 600px;
  width: 100%;
  top: 45%;
  left: 60%;
  padding: 40px;
  transform: translate(-50%, -50%);
  box-shadow: ${({ theme }) => theme.boxShadow};
  border-radius: ${({ theme }) => theme.borderRadius};
  background-color: ${({ theme }) => theme.navBackgroundColor};
  transition: bottom 0.3s ease-out;
  z-index: 100;
  h2 {
    margin-bottom: 20px;
  }
  .closeBtn {
    position: fixed;
    top: 40px;
    right: 40px;
  }
  label {
    align-self: start;
  }
  div {
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
  if (!open) return null;
  return (
    <StyledModalContainer
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <h2>{title}</h2>
      <button className={'closeBtn'} onClick={onClose}>
        <Delete />
      </button>
      <label>
        <FormattedMessage defaultMessage={'Renommer le projet'} />:
      </label>
      <div>
        <Input />
        <FormBtn type="submit" value={'Renomer'} />
      </div>

      <label>
        <FormattedMessage defaultMessage={'Participants au projet'} />:
      </label>
      <div>
        <Input />
        <FormBtn type="submit" value={'Inviter'} />
      </div>

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
    </StyledModalContainer>
  );
};

export default ModalProject;
