import styled, { css } from 'styled-components';
import { Button } from 'kepler.gl/dist/components/common/styled-components';
import { themeColor, themeFontSize } from './theme';

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
type SwitchableProps = {
  checked: boolean;
};

// theme is passed to kepler.gl when it's mounted,
// it is used by styled-components to pass along to
// all child components

export const input = css<InputProps>`
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

export const inputLT = css`
  ::placeholder {
    color: ${({ theme }) => theme.inputPlaceholderColorLT};
    font-weight: 400;
  }
  ${input} {
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

export const secondaryInput = css<SecondaryInputProps>`
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

export const chickletedInputContainer = css`
  cursor: pointer;
  flex-wrap: wrap;
  height: auto;
  justify-content: start;
  margin-bottom: 2px;
  padding: 0px 7px 0px 4px;
  white-space: normal;

  .chickleted-input__placeholder {
    line-height: 24px;
    margin: 4px;
  }
`;

export const chickletedInput = css`
  ${({ theme }) => theme.input} ${({ theme }) => theme.chickletedInputContainer};
`;

export const chickletedInputLT = css`
  ${({ theme }) => theme.inputLT} ${({ theme }) => theme.chickletedInputContainer};
`;

export const secondaryChickletedInput = css`
  ${({ theme }) => theme.secondaryInput} ${({ theme }) => theme.chickletedInputContainer};
`;

export const inlineInput = css`
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

export const switchTrack = css<SwitchableProps>`
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

export const switchButton = css<SwitchableProps>`
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

export const inputSwitch = css`
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

// This is a light version checkbox
export const checkboxBox = css<SwitchableProps>`
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

export const checkboxCheck = css<SwitchableProps>`
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

export const inputCheckbox = css`
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

export const radioTrack = css`
  ${({ theme }) => theme.checkboxBox}
  width: ${({ theme }) => theme.radioRadius * 2}px;
  height: ${({ theme }) => theme.radioRadius * 2}px;
  border-radius: ${({ theme }) => theme.radioBorderRadius}px;
  background-color: ${({ theme }) => theme.switchTrackBgd};
  border-color: ${({ theme }) => theme.radioBorderColor};
`;

export const radioButton = css`
  border: 0;
  display: table;
  top: ${({ theme }) => theme.radioRadius - theme.radioButtonRadius}px;
  left: ${({ theme }) => theme.radioRadius - theme.radioButtonRadius}px;
  width: ${({ theme }) => theme.radioButtonRadius * 2}px;
  height: ${({ theme }) => theme.radioButtonRadius * 2}px;
  border-radius: ${({ theme }) => theme.radioButtonRadius * 2}px;
  background-color: ${({ theme }) => theme.radioButtonBgdColor};
`;

export const inputRadio = css`
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

export const secondaryRadio = css<SwitchableProps>`
  ${({ theme }) => theme.inputRadio}

  :before {
    ${({ theme }) => theme.radioTrack} background: ${({ theme }) => theme.secondarySwitchTrackBgd};
  }

  :after {
    ${({ theme }) => theme.radioButton}
    background: ${(props) => (props.checked ? props.theme.switchBtnBgdActive : props.theme.secondarySwitchBtnBgd)};
  }
`;

export const secondarySwitch = css<SwitchableProps>`
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

export const dropdownScrollBar = css`
  ::-webkit-scrollbar {
    height: 10px;
    width: 10px;
  }

  ::-webkit-scrollbar-corner {
    background: ${({ theme }) => theme.dropdownListBgd};
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.dropdownListBgd};
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: ${({ theme }) => theme.labelColor};
    border: 3px solid ${({ theme }) => theme.dropdownListBgd};
  }

  :vertical:hover {
    background: ${({ theme }) => theme.textColorHl};
    cursor: pointer;
  }
`;

export const dropdownScrollBarLT = css`
  ${dropdownScrollBar} ::-webkit-scrollbar-corner {
    background: ${({ theme }) => theme.dropdownListBgdLT};
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.dropdownListBgdLT};
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: ${({ theme }) => theme.scrollbarThumbColorLT};
    border: 3px solid ${({ theme }) => theme.dropdownListBgdLT};
  }

  :vertical:hover {
    background: ${({ theme }) => theme.scrollbarThumbColorHoverLT};
    cursor: pointer;
  }
`;

export const dropdownListAnchor = css`
  color: ${({ theme }) => theme.selectColor};
  padding-left: 3px;
  font-size: ${({ theme }) => theme.selectFontSize};
  line-height: ${({ theme }) => theme.dropdownListLineHeight}px;

  &.disabled {
    color: ${({ theme }) => theme.subtextColor};
  }
`;

export const dropdownListAnchorLT = css`
  ${dropdownListAnchor} {
    color: ${({ theme }) => theme.selectColorLT};
  }
`;

export const dropdownListSize = css`
  font-size: 11px;
  padding: 3px 9px;
  font-weight: 500;
  white-space: nowrap;
`;

export const dropdownListItem = css`
  ${dropdownListSize} &.hover,
  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.dropdownListHighlightBg};

    .list__item__anchor {
      color: ${({ theme }) => theme.textColorHl};
    }
  }
`;

export const dropdownListItemLT = css`
  ${dropdownListSize} {
    color: ${({ theme }) => theme.textColorLT};

    &.hover,
    &:hover {
      cursor: pointer;
      color: ${({ theme }) => theme.textColorHlLT};
      background-color: ${({ theme }) => theme.dropdownListHighlightBgLT};

      .list__item__anchor {
        color: ${({ theme }) => theme.selectColorLT};
      }
    }
  }
`;
export const dropdownListHeader = css`
  font-size: 11px;
  padding: 5px 9px;
  color: ${({ theme }) => theme.labelColor};
`;
export const dropdownListSection = css`
  padding: 0 0 4px 0;
  margin-bottom: 4px;
  border-bottom: 1px solid ${({ theme }) => theme.labelColor};
`;
export const dropdownList = css`
  overflow-y: auto;
  max-height: 280px;
  box-shadow: ${({ theme }) => theme.dropdownListShadow};
  border-radius: 2px;

  .list__section {
    ${({ theme }) => theme.dropdownListSection};
  }
  .list__header {
    ${({ theme }) => theme.dropdownListHeader};
  }

  .list__item {
    ${({ theme }) => theme.dropdownListItem};
  }

  .list__item__anchor {
    ${({ theme }) => theme.dropdownListAnchor};
  }

  ${({ theme }) => theme.dropdownScrollBar};
`;
export const dropdownListLT = css`
  ${dropdownList} .list__item {
    ${({ theme }) => theme.dropdownListItemLT};
  }

  .list__item__anchor {
    ${({ theme }) => theme.dropdownListAnchorLT};
  }

  ${({ theme }) => theme.dropdownScrollBarLT};
`;
export const sidePanelScrollBar = css`
  ::-webkit-scrollbar {
    height: ${({ theme }) => theme.sidePanelScrollBarHeight}px;
    width: ${({ theme }) => theme.sidePanelScrollBarWidth}px;
  }

  ::-webkit-scrollbar-corner {
    background: ${({ theme }) => theme.sidePanelBg};
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.sidePanelBg};
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: ${({ theme }) => theme.panelBackgroundHover};
    border: 3px solid ${({ theme }) => theme.sidePanelBg};

    :hover {
      background: ${({ theme }) => theme.labelColor};
      cursor: pointer;
    }
  }
`;
export const panelDropdownScrollBar = css`
  ::-webkit-scrollbar {
    height: 10px;
    width: 10px;
  }

  ::-webkit-scrollbar-corner {
    background: ${({ theme }) => theme.panelBackground};
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.panelBackground};
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: ${({ theme }) => theme.panelBackgroundHover};
    border: 3px solid ${({ theme }) => theme.panelBackground};
    :hover {
      background: ${({ theme }) => theme.labelColor};
      cursor: pointer;
    }
  }
`;
export const scrollBar = css`
  ::-webkit-scrollbar {
    height: 10px;
    width: 10px;
  }

  ::-webkit-scrollbar-corner {
    background: ${({ theme }) => theme.panelBackground};
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.panelBackground};
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: ${({ theme }) => theme.labelColor};
    border: 3px solid ${({ theme }) => theme.panelBackground}

    :vertical:hover {
      background: ${({ theme }) => theme.textColorHl};
      cursor: pointer;
    }

    :horizontal:hover {
      background: ${({ theme }) => theme.textColorHl};
      cursor: pointer;
    }
  }
`;
export const modalScrollBar = css`
  ::-webkit-scrollbar {
    width: 14px;
    height: 16px;
  }

  ::-webkit-scrollbar-track {
    background: white;
  }
  ::-webkit-scrollbar-track:horizontal {
    background: ${({ theme }) => theme.textColorHl};
  }
  ::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.scrollbarThumbColorLT};
    border: 4px solid white;
  }

  ::-webkit-scrollbar-corner {
    background: ${({ theme }) => theme.textColorHl};
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.scrollbarThumbColorHoverLT};
  }

  ::-webkit-scrollbar-thumb:vertical {
    border-radius: 7px;
  }

  ::-webkit-scrollbar-thumb:horizontal {
    border-radius: 9px;
    border: 4px solid ${({ theme }) => theme.textColorHl};
  }
`;

// Custom Datatlas Component

export const StyledLabel = styled.label`
  display: flex;
  margin: 20px 0 10px 0;
  font-size: ${themeFontSize.sText};
  font-weight: 700;
`;

export const FormBtn = styled(Button).attrs({ as: 'input' })`
  margin: 20px auto;
  padding: 15px 40px;
  font-size: ${themeFontSize.mText};
  font-weight: 700;
  opacity: 1;
`;

export const BadgeOutlines = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  border: 1.5px solid ${themeColor.primaryColor};
  border-radius: 50%;
  margin-left: 2px;
  font-size: ${({ theme }) => theme.fontSizeXs};
`;
