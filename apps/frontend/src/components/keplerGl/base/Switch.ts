import { css } from 'styled-components';

type SwitchableProps = {
  checked: boolean;
};
export const SwitchTrack = css<SwitchableProps>`
  background: ${(props) => (props.checked ? props.theme.switchTrackBgdActive : props.theme.switchTrackBgd)};
  position: absolute;
  top: 0;
  left: ${(props) => -props.theme.switchLabelMargin}px;
  content: '';
  display: block;
  width: ${({ theme }) => theme.switchWidth}px;
  height: ${({ theme }) => theme.switchHeight}px;
  border-radius: ${({ theme }) => theme.switchTrackBorderRadius};
`;

export const SwitchButton = css<SwitchableProps>`
  transition: ${({ theme }) => theme.transition};
  position: absolute;
  top: ${(props) => (props.theme.switchHeight - props.theme.switchBtnHeight) / 2}px;
  left: ${(props) =>
    (props.checked ? props.theme.switchWidth / 2 : (props.theme.switchHeight - props.theme.switchBtnHeight) / 2) -
    props.theme.switchLabelMargin}px;
  content: '';
  display: block;
  height: ${({ theme }) => theme.switchBtnHeight}px;
  width: ${({ theme }) => theme.switchBtnWidth}px;
  background: ${(props) => (props.checked ? props.theme.switchBtnBgdActive : props.theme.switchBtnBgd)};
  box-shadow: ${({ theme }) => theme.switchBtnBoxShadow};
  border-radius: ${({ theme }) => theme.switchBtnBorderRadius};
`;

export const InputSwitch = css`
  user-select: none;
  cursor: pointer;
  line-height: ${({ theme }) => theme.switchHeight}px;
  font-weight: 500;
  font-size: 12px;
  color: ${({ theme }) => theme.labelColor};
  position: relative;
  display: inline-block;
  padding-top: 0;
  padding-right: 0;
  padding-bottom: 0;
  padding-left: ${({ theme }) => theme.switchWidth}px;

  :before {
    ${({ theme }) => theme.switchTrack};
  }

  :after {
    ${({ theme }) => theme.switchButton};
  }
`;

export const SecondarySwitch = css<SwitchableProps>`
  ${({ theme }) => theme.inputSwitch}

  :before {
    ${({ theme }) => theme.switchTrack} background: ${(props) =>
      props.checked ? props.theme.switchTrackBgdActive : props.theme.secondarySwitchTrackBgd};
  }

  :after {
    ${({ theme }) => theme.switchButton}
    background: ${(props) => (props.checked ? props.theme.switchBtnBgdActive : props.theme.secondarySwitchBtnBgd)};
  }
`;
