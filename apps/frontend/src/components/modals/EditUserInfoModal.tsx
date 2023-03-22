import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Input } from 'kepler.gl/dist/components/common/styled-components';
import { ModalFooter, ModalTitle } from 'kepler.gl/dist/components/common/modal';
import { StyledLabel } from '../forms';
import { CloseButton, StyledFormBtn } from '../buttons';
import { StyledModalContainer, ModalContent } from './StyledModal';

interface EditUserInfoModalInterface {
  title: string | null;
  open: boolean;
  onClose: () => void;
}

export const EditUserInfoModal = ({ title, open, onClose }: EditUserInfoModalInterface) => {
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
          <FormattedMessage defaultMessage={'Prénom'} />:
        </StyledLabel>
        <form>
          <Input />
          <StyledFormBtn type="submit" value={'Name'} />
          <p>Ce prénom apparaît sur votre page de profil</p>
        </form>
        <StyledLabel>
          <FormattedMessage defaultMessage={'Mot de passe actuel'} />:
        </StyledLabel>
        <form>
          <Input />
          <StyledFormBtn type="submit" value={'ActualMp'} />
        </form>
        <StyledLabel>
          <FormattedMessage defaultMessage={'Nouveau mot de passe'} />:
        </StyledLabel>
        <form>
          <Input />
          <StyledFormBtn type="submit" value={'NewMp'} />
        </form>
        <StyledLabel>
          <FormattedMessage defaultMessage={'Confirmer le nouveau mot de passe'} />:
        </StyledLabel>
        <form>
          <Input />
          <StyledFormBtn type="submit" value={'ConfirmMp'} />
        </form>
        <ul>
          <p>Créez un mot de passe qui:</p>
          <li>contient au moins 8 caractères</li>
          <li>contient des lettres minuscules (a-z) et majuscules (A-Z)</li>
          <li>contient au moins un chiffre (0-9) ou un symbole</li>
          <li>ne contient pas votre adresse e-mail</li>
          <li>n’est pas communément utilisé</li>
        </ul>
      </ModalContent>
      <ModalFooter cancel={'Annuler'} cancelButton={'Cancel'} confirmButton={'Envoyer'} />
    </StyledModalContainer>
  );
};
