import styled from 'styled-components';
import { TextArea as KeplerTextArea } from '@kepler.gl/components';

// @ts-ignore
export const TextArea = styled(KeplerTextArea)`
  white-space: pre-wrap;
  height: initial;
  caret-color: #767676;
`;
