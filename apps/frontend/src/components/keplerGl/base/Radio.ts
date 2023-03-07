import { css } from 'styled-components';

type SwitchableProps = {
  checked: boolean;
};

export const RadioTrack = css`
  ${({ theme }) => theme.checkboxBox}
  width: ${({ theme }) => theme.radioRadius * 2}px;
  height: ${({ theme }) => theme.radioRadius * 2}px;
  border-radius: ${({ theme }) => theme.radioBorderRadius}px;
  background-color: ${({ theme }) => theme.switchTrackBgd};
  border-color: ${({ theme }) => theme.radioBorderColor};
`;

export const RadioButton = css`
  border: 0;
  display: table;
  top: ${({ theme }) => theme.radioRadius - theme.radioButtonRadius}px;
  left: ${({ theme }) => theme.radioRadius - theme.radioButtonRadius}px;
  width: ${({ theme }) => theme.radioButtonRadius * 2}px;
  height: ${({ theme }) => theme.radioButtonRadius * 2}px;
  border-radius: ${({ theme }) => theme.radioButtonRadius * 2}px;
  background-color: ${({ theme }) => theme.radioButtonBgdColor};
`;

export const InputRadio = css`
  ${({ theme }) => theme.inputCheckbox}
  padding-left: ${({ theme }) => theme.radioRadius * 2 + 8}px;
  margin-bottom: 0;
  margin-left: 0;
  line-height: ${({ theme }) => theme.radioRadius * 2}px;
  color: ${({ theme }) => theme.textColorHl};
  cursor: pointer;

  :before {
    ${({ theme }) => theme.radioTrack}
  }

  :after {
    ${({ theme }) => theme.radioButton}
  }
`;

export const SecondaryRadio = css<SwitchableProps>`
  ${({ theme }) => theme.inputRadio}

  :before {
    ${({ theme }) => theme.radioTrack} background: ${({ theme }) => theme.secondarySwitchTrackBgd};
  }

  :after {
    ${({ theme }) => theme.radioButton}
    background: ${(props) => (props.checked ? props.theme.switchBtnBgdActive : props.theme.secondarySwitchBtnBgd)};
  }
`;
