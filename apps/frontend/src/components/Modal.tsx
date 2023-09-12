/* eslint-disable @typescript-eslint/no-empty-function */
// Ported from kepler.gl/src/components/common/modal.js
import React from 'react';
import styled, { FlattenSimpleInterpolation } from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { Delete } from 'kepler.gl/dist/components/common/icons';
import { Button } from 'kepler.gl/dist/components/common/styled-components';
import { ModalTitle } from 'kepler.gl/dist/components/common/modal';
import { media } from 'kepler.gl/dist/styles/media-breakpoints';
import { DatatlasThemeProps } from '../style/theme';
import Modal from 'react-modal';

const ModalContentWrapper = styled.div<Pick<ModalDialogProps, 'cssStyle' | 'footer'>>`
  overflow-y: auto;
  max-width: 70vw;
  max-height: 85vh;
  padding: 24px 72px 40px;
  position: relative;
  top: 92px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: #ffffff;
  border-radius: 4px;
  transition: ${(props) => props.theme.transition};
  box-sizing: border-box;
  font-size: 12px;
  color: ${(props) => props.theme.labelColorLT};

  ${media.portable`
    padding: 12px 36px 24px;
    max-width: 80vw;
  `}

  ${media.palm`
    max-width: 100vw;
  `}

  ${(props) => props.cssStyle || ''};
`;

const ModalContent = styled.div`
  position: relative;
  z-index: ${(props) => props.theme.modalContentZ};
`;

const StyledModalFooter = styled.div`
  width: 100%;
  left: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-top: 24px;
  ${media.portable`
    padding-top: 24px;
  `};

  ${media.palm`
    padding-top: 16px;
  `};
  z-index: ${(props) => props.theme.modalFooterZ};
`;

const CloseButton = styled.div`
  color: ${(props) => props.theme.titleColorLT};
  display: flex;
  justify-content: flex-end;
  z-index: ${(props) => props.theme.modalButtonZ};
  position: absolute;
  top: 24px;
  right: 24px;

  :hover {
    cursor: pointer;
  }
`;

const FooterActionWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const defaultCancelButton = {
  link: true,
  large: true,
  children: 'modal.button.defaultCancel',
};

const defaultConfirmButton = {
  cta: true,
  large: true,
  width: '160px',
  children: 'modal.button.defaultConfirm',
};

export const ModalFooter = ({ cancel, confirm, cancelButton, confirmButton }) => {
  const cancelButtonProps = { ...defaultCancelButton, ...cancelButton };
  const confirmButtonProps = { ...defaultConfirmButton, ...confirmButton };
  return (
    <StyledModalFooter className="modal--footer">
      <FooterActionWrapper>
        <Button className="modal--footer--cancel-button" {...cancelButtonProps} onClick={cancel}>
          <FormattedMessage id={cancelButtonProps.children} />
        </Button>
        <Button className="modal--footer--confirm-button" {...confirmButtonProps} onClick={confirm}>
          <FormattedMessage id={confirmButtonProps.children} />
        </Button>
      </FooterActionWrapper>
    </StyledModalFooter>
  );
};

interface ButtonProps {
  large: boolean;
  children: string;
  negative?: boolean;
}

interface ConfirmButtonProps extends ButtonProps {
  cta?: boolean;
  width?: string;
}
interface CancelButtonProps extends ButtonProps {
  link: boolean;
}

type ModalDialogProps = DatatlasThemeProps &
  Modal.Props & {
    title: string;
    footer?: boolean;
    close?: boolean;
    onConfirm?: () => void;
    onCancel?: () => void;
    confirmButton?: ConfirmButtonProps;
    confirmButtonLabel?: string;
    cancelButton?: CancelButtonProps;
    cancelButtonLabel?: string;
    cssStyle?: FlattenSimpleInterpolation;
    style?: React.CSSProperties;
  };

const ModalDialog = ({
  footer = false,
  close = true,
  onCancel = () => {},
  onConfirm = () => {},
  cancelButton = defaultCancelButton,
  confirmButton = defaultConfirmButton,
  cssStyle = [],
  ...props
}: ModalDialogProps) => (
  <Modal
    className={props.className}
    {...props}
    ariaHideApp={false}
    style={{
      overlay: {
        backgroundColor: (props.theme && props.theme.modalOverlayBgd) || 'rgba(0, 0, 0, 0.5)',
        zIndex: (props.theme && props.theme.modalOverLayZ) || 1000,
        // in case we want to override the modal dialog style
        ...props.style,
      },
    }}
  >
    <ModalContentWrapper className="modal--wrapper" cssStyle={cssStyle} footer={footer}>
      {close && (
        <CloseButton className="modal--close" onClick={onCancel}>
          <Delete height="14px" />
        </CloseButton>
      )}
      <div>
        {props.title && (
          <ModalTitle className="modal--title">
            <FormattedMessage id={props.title} />
          </ModalTitle>
        )}
        <ModalContent className="modal--body">{props.children}</ModalContent>
        {footer && (
          <ModalFooter
            cancel={onCancel}
            confirm={onConfirm}
            cancelButton={cancelButton}
            confirmButton={confirmButton}
          />
        )}
      </div>
    </ModalContentWrapper>
  </Modal>
);

export const StyledModal = styled(ModalDialog)`
  top: 0;
  left: 0;
  transition: ${(props) => props.theme.transition};
  padding-left: 40px;
  padding-right: 40px;

  ${media.portable`
    padding-left: 24px;
    padding-right: 24px;
  `};

  ${media.palm`
    padding-left: 0;
    padding-right: 0;
  `};

  :focus {
    outline: 0;
  }
`;
