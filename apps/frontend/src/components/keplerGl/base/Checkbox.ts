// This is a light version checkbox
import { css } from 'styled-components';

type SwitchableProps = {
  checked: boolean;
};
export const CheckboxBox = css<SwitchableProps>`
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: ${({ theme }) => theme.checkboxWidth}px;
  height: ${({ theme }) => theme.checkboxHeight}px;
  background: ${(props) => (props.checked ? props.theme.checkboxBoxBgdChecked : props.theme.checkboxBoxBgd)};
  border: 1px solid ${(props) => (props.checked ? props.theme.checkboxBoxBgdChecked : props.theme.checkboxBorderColor)};
  border-radius: 2px;
  content: '';
`;

export const CheckboxCheck = css<SwitchableProps>`
  width: 10px;
  height: 5px;
  border-bottom: 2px solid white;
  border-left: 2px solid white;
  top: 4px;
  left: 3px;
  transform: rotate(-45deg);
  display: block;
  position: absolute;
  opacity: ${(props) => (props.checked ? 1 : 0)};
  content: '';
`;

export const InputCheckbox = css`
  display: inline-block;
  position: relative;
  padding-left: 32px;
  margin-bottom: 24px;
  line-height: 20px;
  vertical-align: middle;
  cursor: pointer;
  font-size: 12px;
  color: ${({ theme }) => theme.labelColor};
  margin-left: -${({ theme }) => theme.switchLabelMargin}px;

  :before {
    ${({ theme }) => theme.checkboxBox};
  }

  :after {
    ${({ theme }) => theme.checkboxCheck};
  }
`;
