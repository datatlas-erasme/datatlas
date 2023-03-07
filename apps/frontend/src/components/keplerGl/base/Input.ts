import { css } from 'styled-components';

type InputProps = {
  active: boolean;
  disabled: boolean;
  error: string;
  size: string;
  type: string;
};

type SecondaryInputProps = {
  error: string;
};
export const Input = css<InputProps>`
  ::placeholder {
    color: ${({ theme }) => theme.inputPlaceholderColor};
    font-weight: ${({ theme }) => theme.inputPlaceholderFontWeight};
  }

  /* Disable Arrows on Number Inputs */
  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  align-items: center;
  background-color: ${({ theme }) => theme.inputBgd};
  border: 1px solid
    ${(props) =>
      props.active ? props.theme.inputBorderActiveColor : props.error ? props.theme.errorColor : props.theme.inputBgd};
  border-radius: 2px;
  caret-color: ${({ theme }) => theme.inputBorderActiveColor};
  color: ${({ theme }) => theme.inputColor};
  display: flex;
  font-size: ${(props) =>
    ['small', 'tiny'].includes(props.size) ? props.theme.inputFontSizeSmall : props.theme.inputFontSize};
  font-weight: ${({ theme }) => theme.inputFontWeight};
  font-family: ${({ theme }) => theme.fontFamily};
  height: ${(props) =>
    props.size === 'small'
      ? props.theme.inputBoxHeightSmall
      : props.size === 'tiny'
      ? props.theme.inputBoxHeightTiny
      : props.theme.inputBoxHeight};
  justify-content: space-between;
  outline: none;
  overflow: hidden;
  padding: ${(props) =>
    props.size === 'small'
      ? props.theme.inputPaddingSmall
      : props.size === 'tiny'
      ? props.theme.inputPaddingTiny
      : props.theme.inputPadding};
  text-overflow: ellipsis;
  transition: ${({ theme }) => theme.transition};
  white-space: nowrap;
  width: 100%;
  word-wrap: normal;
  pointer-events: ${(props) => (props.disabled ? 'none' : 'all')};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  box-shadow: ${({ theme }) => theme.inputBoxShadow};

  :hover {
    cursor: ${(props) => (props.type === 'number' || props.type === 'text' ? 'text' : 'pointer')};
    background-color: ${(props) => (props.active ? props.theme.inputBgdActive : props.theme.inputBgdHover)};
    border-color: ${(props) => (props.active ? props.theme.inputBorderActiveColor : props.theme.inputBorderHoverColor)};
  }

  :active,
  :focus,
  &.focus,
  &.active {
    background-color: ${({ theme }) => theme.inputBgdActive};
    border-color: ${({ theme }) => theme.inputBorderActiveColor};
    box-shadow: ${({ theme }) => theme.inputBoxShadowActive};
  }
`;

export const InputLT = css`
  ::placeholder {
    color: ${({ theme }) => theme.inputPlaceholderColorLT};
    font-weight: 400;
  }
  ${Input} {
    background-color: ${({ theme }) => theme.selectBackgroundLT};
    border: 1px solid
      ${(props) =>
        props.active
          ? props.theme.selectActiveBorderColor
          : props.error
          ? props.theme.errorColor
          : props.theme.selectBorderColorLT};
    color: ${({ theme }) => theme.selectColorLT};
    caret-color: ${({ theme }) => theme.inputBorderActiveColorLT};
  }

  :hover {
    background-color: ${({ theme }) => theme.inputBgdActiveLT};
    cursor: ${(props) => (['number', 'text'].includes(props.type) ? 'text' : 'pointer')};
    border-color: ${(props) =>
      props.active ? props.theme.inputBorderActiveColorLT : props.theme.inputBorderHoverColorLT};
  }

  :active,
  :focus,
  &.focus,
  &.active {
    background-color: ${({ theme }) => theme.inputBgdActiveLT};
    border-color: ${({ theme }) => theme.inputBorderActiveColorLT};
    box-shadow: ${({ theme }) => theme.inputBoxShadowActiveLT};
  }
`;

export const InlineInput = css`
  ${({ theme }) => theme.input} color: ${({ theme }) => theme.textColor};
  font-size: 13px;
  letter-spacing: 0.43px;
  line-height: 18px;
  height: 24px;
  font-weight: 400;
  padding-left: 4px;
  margin-left: -4px;
  background-color: transparent;
  border: 1px solid transparent;

  :hover {
    height: 24px;
    cursor: text;
    background-color: transparent;
    border: 1px solid ${({ theme }) => theme.labelColor};
  }

  :active,
  .active,
  :focus {
    background-color: transparent;
    border: 1px solid ${({ theme }) => theme.inputBorderActiveColor};
  }
`;

export const SecondaryInput = css<SecondaryInputProps>`
  ${({ theme }) => theme.input}
  color: ${({ theme }) => theme.secondaryInputColor};
  background-color: ${({ theme }) => theme.secondaryInputBgd};
  border: 1px solid ${(props) => (props.error ? props.theme.errorColor : props.theme.secondaryInputBorderColor)};

  :hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.secondaryInputBgdHover};
    border-color: ${({ theme }) => theme.secondaryInputBgdHover};
  }

  :active,
  &.active {
    background-color: ${({ theme }) => theme.secondaryInputBgdActive};
    border-color: ${({ theme }) => theme.secondaryInputBorderActiveColor};
  }
`;
