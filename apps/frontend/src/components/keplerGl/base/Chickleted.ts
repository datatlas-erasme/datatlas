import {css} from 'styled-components';

export const ChickletedInputContainer = css`
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

export const ChickletedInput = css`
  ${({theme}) => theme.input} ${({theme}) => theme.chickletedInputContainer};
`;

export const ChickletedInputLT = css`
  ${({theme}) => theme.inputLT} ${({theme}) => theme.chickletedInputContainer};
`;

export const SecondaryChickletedInput = css`
  ${({theme}) => theme.secondaryInput} ${({theme}) => theme.chickletedInputContainer};
`;
