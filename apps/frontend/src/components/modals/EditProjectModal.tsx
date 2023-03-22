import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { Input, SelectionButton } from 'kepler.gl/dist/components/common/styled-components';
import { ModalTitle } from 'kepler.gl/dist/components/common/modal';
import { StyledLabel } from '../forms';
import { StyledFormBtn } from '../buttons';
import { StyledModalContainer, ModalContent } from './StyledModal';
import { CloseButton } from '../buttons';

interface EditProjectModalInterface {
  title: string | null;
  open: boolean;
  onClose: () => void;
}

const UserEditor = [
  { name: 'Olivier', status: ['Admin', 'Editor', 'Reader'] },
  { name: 'Marie', status: ['Admin', 'Editor', 'Reader'] },
];

const StyledEditorSelect = styled(SelectionButton).attrs({ as: 'select' })`
  border: none;
`;

export const EditProjectModal = ({ title, onClose, open }: EditProjectModalInterface) => {
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
        <CloseButton onClose={onClose} />
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
          {UserEditor.map((item, index) => (
            <li key={index}>
              <p>{item.name}</p>
              <StyledEditorSelect>
                {item.status.map((item, i) => (
                  <option key={i} value={item}>
                    {item}
                  </option>
                ))}
              </StyledEditorSelect>
            </li>
          ))}
        </ul>
      </ModalContent>
    </StyledModalContainer>
  );
};
