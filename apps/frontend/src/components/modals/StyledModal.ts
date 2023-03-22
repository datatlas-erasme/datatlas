import styled from 'styled-components';
import Modal from 'react-modal';
import { Input, StyledModalContent } from 'kepler.gl/dist/components/common/styled-components';

export const StyledModalContainer = styled(Modal)`
  display: flex;
  flex-direction: column;
  align-con: center;
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

export const ModalContent = styled(StyledModalContent)`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: none;

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
