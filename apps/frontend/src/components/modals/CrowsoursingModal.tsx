import React from 'react';
import styled from 'styled-components';
import { ModalContent } from './StyledModal';
import { StyledLabel } from '../forms';
import { Share } from 'kepler.gl/dist/components/common/icons';
import { Button } from '../buttons';
import Checkbox from 'kepler.gl/dist/components/common/checkbox';
import { ModalWrapper } from './ModalWrapper';
import { CloseButton } from '../buttons';

interface CrowdsourcingModalInterface {
  title: string | null;
  open: boolean;
  onClose: () => void;
}

const StyledCrowdsourcingModalContent = styled(ModalContent)`
  ul {
    padding-left: 20px;
    li {
      ${({ theme }) => theme.InputRadio}
      border: none;
      justify-content: start;
      align-items: center;
    }
  }
`;

export const CrowdsourcingModal = ({ title, onClose, open }: CrowdsourcingModalInterface) => {
  return (
    <ModalWrapper title={title} onClose={onClose} open={open}>
      <h2>{title}</h2>
      <CloseButton onClose={onClose} />
      <StyledCrowdsourcingModalContent>
        <StyledLabel>Sélectionner un jeu de données parmi les suivants :</StyledLabel>
        <ul>
          <li>
            <Checkbox />
            Jeu de donnée 1
          </li>
          <li>
            <Checkbox />
            Jeu de donnée 2
          </li>
        </ul>
      </StyledCrowdsourcingModalContent>
      <Button>
        <Share />
        Envoyer
      </Button>
    </ModalWrapper>
  );
};
