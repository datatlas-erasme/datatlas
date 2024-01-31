import styled from 'styled-components';
import { TextArea as KeplerTextArea } from 'kepler.gl/dist/components/common/styled-components';

export const TextArea = styled(KeplerTextArea)`
  white-space: pre-wrap;
  height: initial;
  caret-color: #767676;
`;
